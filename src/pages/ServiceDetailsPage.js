import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import ServiceMap from "../components/ServiceMap";
import { ExternalLink } from 'react-external-link';
import { AuthContext } from "../context/auth.context";
import Navbar from "../components/Navbar";
 
 
function ServiceDetails () {
  const [service, setService] = useState(null);
  const { serviceId } = useParams(); 
  const storedToken = localStorage.getItem("authToken");
  const navigate = useNavigate()
  const { user } = useContext(AuthContext);
 

  useEffect(() => { 
    const getService = () => { 
  
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/services/${serviceId}`,
          { headers: { Authorization: `Bearer ${storedToken}` } }
        )
        .then((response) => {
          const oneService = response.data;
          setService(oneService);
        })
        .catch((error) => console.log(error));
    };

    getService();
   
  }, [serviceId, storedToken]);

  const publishService = (e) => {
    const storedToken = localStorage.getItem("authToken");
    service.isApproved = true;

    const requestBody = {...service}
  
    axios.put(
      `${process.env.REACT_APP_API_URL}/api/services/${serviceId}`, 
      requestBody,
      { headers: { Authorization: `Bearer ${storedToken}` } }
      )
         .then((response) => {
          navigate(`/service/list`)
         });  
  }
  
  
  if(service === null){
    return <p>Loading project...</p>
  }


  return ( 
    <>
      <Navbar />

      <div className="ServiceDetails">
        <ServiceMap key={service._id} latitude={service.latitude} longitude={service.longitude}/>
        
        {service && (
          <>

          {service.imageUrl &&(
            <>
            <img src={service.imageUrl} alt="service" width="400px"></img>
            </>
          )}
            <div className="ServiceContent">
              <h1>{service.name}</h1>
              <Link className="linkBack" to="/service/list">
                👈 Back to services
              </Link>
              <h5>
                <div className="GroupedInfo">
                  <p>
                    {service.street !== "" && service.street} 
                    {service.streetNr !== "" && ` ${service.streetNr}`}
                  </p>
                  {service.complement !== "" && (
                    <p>{service.complement}</p>
                  )}
                  {service.zip !== "" && (
                    <p>Berlin {service.zip}</p>
                  )}
                </div>
              </h5>
              {service.description !== "" && (
                <p>{service.description}</p>
              )}
              {service.date !== "" && (
                <p>🗓 {service.date}</p>
              )}
              {service.time !== "" && (
                <p>🕑 {service.time}</p>
              )}
              {service.website !== "" && (
                <ExternalLink href={`${service.website}`}>
                  <span>{`👩‍💻 ${service.website}`}</span>
                </ExternalLink>
              )}
              {service.email !== "" && (
                <p>✉️ {service.email}</p>
              )}
              {service.phone !== "" && (
                <p>📞 {service.phone}</p>
              )}
            </div>

          <img className="service-pic" src={service.imageUrl} alt="service-pic" width="400px"></img>
          </>
        )}
        
        {user?.isAdmin && (
          <div className="ActionButtons">
            <Link to={`/service/edit/${serviceId}`}>
              <button className="CancelBtn">Edit Submission</button>
            </Link>
            {!service.isApproved && (
              <button onClick={publishService}>Publish</button>
            )}
          </div>      
        )}
      </div>
    </>
  );
}
 
export default ServiceDetails;