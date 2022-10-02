import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditService() {
  const navigate = useNavigate();
  const { serviceId } = useParams();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [street, setStreet] = useState("");
  const [streetNr, setStreetNr] = useState("");
  const [complement, setComplement] = useState("");
  const [zip, setZip] = useState("");
  const [website, setWebsite] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, category, street, streetNr, complement, zip, website, email, phone, description, picture, date, time };

    axios.put(`${process.env.REAT_APP_API_URL}/api/services/${serviceId}`, requestBody)
         .then((response) => {
          navigate(`/service/${serviceId}`)
         });
  }

  const deleteProject = () => {
    axios.delete(`${process.env.REAT_APP_API_URL}/api/services/${serviceId}`)
         .then(() => {
          navigate('/')
         })
         .catch((error) => console.log(error));
  };

  useEffect(()=>{
    axios.get(`${process.env.REAT_APP_API_URL}/api/services/${serviceId}`)
         .then((response) => {
          const oneService = response.data;
          setName(oneService.name);
          setCategory(oneService.category);
          setStreet(oneService.street);
          setStreetNr(oneService.streetNr);
          setComplement(oneService.complement);
          setZip(oneService.zip);
          setWebsite(oneService.website);
          setEmail(oneService.email);
          setPhone(oneService.phone);
          setDescription(oneService.description);
          setPicture(oneService.picture);
          setDate(oneService.date);
          setTime(oneService.time);
          navigate('/');
         })
         .catch((error) => console.log(error));
  })


    return (
      <div className="editService">
        <h1>Edit the submission:</h1>
        <form onSubmit={handleSubmit}>
                <label>Name:*</label>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
                <label>Category:*</label>
                <select name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option defaultValue="events"  hidden>Select a category</option>
                    <option value="events">Events</option>
                    <option value="groups">Groups</option>
                    <option value="jobs">Jobs</option>
                    <option value="learning">Learning</option>
                    <option value="support">Support</option>
                    <option value="others">Others</option>
                </select>
                <label>Street:</label>
                <input type="text" name="street" value={street}  onChange={(e) => setStreet(e.target.value)}/>
                <label>Street Nr:</label>
                <input type="text" name="streetNr" value={streetNr} onChange={(e) => setStreetNr(e.target.value)}/>
                <label>Address complement:</label>
                <input type="text" name="complement" value={complement} onChange={(e) => setComplement(e.target.value)}/>
                <label>Zip:</label>
                <input type="text" name="zip" value={zip} onChange={(e) => setZip(e.target.value)}/>
                <label>Website:</label>
                <input type="text" name="website" value={website} onChange={(e) => setWebsite(e.target.value)}/>
                <label>E-mail address:</label>
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <label>Phone:</label>
                <input type="text" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <label>Description:*</label>
                <input type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                <label>Picture:</label>
                <input type="text" name="picture" value={picture} onChange={(e) => setPicture(e.target.value)}/>
                <label>In case you're submitting an event please indicate the date:</label>
                <input type="text" name="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                <label>In case you're submitting an event please indicate the time:</label>
                <input type="text" name="time" value={time} onChange={(e) => setTime(e.target.value)}/>
                <label htmlFor="isApproved">Approve submission:</label>
                <input type="checkbox" name="isApproved" value="true"></input>
                <button type="submit">Submit changes</button>
            </form>
            <p>All fields marked with an asterisk are mandatory.</p>
            <button onClick={deleteProject}>Delete Project</button>
      </div>
    );
  }
  
export default EditService;