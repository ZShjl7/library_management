import {React, useState, useEffect} from 'react';
import Navbar from './Navbar';
import './all.css'; // Import CSS file for styling
import Add from './Add';
import Delete from './Delete';
import Issue from './Issue';
import Return from './Return';
import View from './View';

const Home = () => {

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(!token){
      window.location.href = "/"
    }
   }, [])
   
    const [showPopup, setshowPopup] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showIssue, setShowIssue] = useState(false);
    const [showReturn, setShowReturn] = useState(false);
    const [showView, setShowView] = useState(false);

    const togglePopup = () =>{
        setshowPopup(!showPopup);
    };
    const toggleDelete = () => {
        setShowDelete(!showDelete);
    };
    const toggleIssue = () => {
      setShowIssue(!showIssue);
    };
    const toggleReturn = () => {
      setShowReturn(!showReturn);
    };
    const toggleView = () => {
      setShowView(!showView);
    };
    
  return (<>
  <Navbar />
    <div className="home">
      <div className="home-content">
        <div className="home-left">
            <div className="left-container">
                <h1 className="home-heading">Oxfo management</h1><br />
                <p className="home-subtext">Ofxo provides excellent management solutions for tracking books. Our system ensures efficient organization and real-time monitoring of your book inventory, helping you stay on top of your collection with ease.</p>
            </div>
        </div>
        <div className="home-right">
          <div className="container">
            <a href="#Add" className="container-link" onClick={togglePopup}>Add Book Detail</a>
          </div>
          <div className="container">
            <a href="#Delete" className="container-link" onClick={toggleDelete}>Delete Book</a>
          </div>
          <div className="container">
            <a href="#View" className="container-link" onClick={toggleView}>View Book List</a>
          </div>
          <div className="container">
            <a href="#Issue" className="container-link" onClick={toggleIssue}>Issue Book to Student</a>
          </div>
          <div className="container">
            <a href="#Return" className="container-link" onClick={toggleReturn}>Return Book</a>
          </div>
        </div>
      </div>

      <Add show={showPopup} onClose={togglePopup} />
      <Delete show={showDelete} onClose={toggleDelete} />
      <Issue show={showIssue} onClose={toggleIssue} />
      <Return show={showReturn} onClose={toggleReturn} />
      <View show={showView} onClose={toggleView} />

    </div>
    </>
  );
};

export default Home;
