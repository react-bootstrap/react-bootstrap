import React from 'react';
import "./Card.css";
//this is a reversable stylish card by ahmed attalah 
function SlylishCard() {
  const [Description, setDescription] = useState("Hi I'm Attalah");
  const [Header, setHeader] = useState("Attalah");
  const [SubHead, setSubHead] = useState("Attalah");
  useEffect(() => {
    const card = document.querySelector(".card");
    let flipCard = false;
    
    card.addEventListener('click',function() {
      if(flipCard) {
        return; 
      }
      
      flipCard = true;
      anime({
        targets: card,
        scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
        rotateY: {value: '+=180', delay: 200},
        easing: 'easeInOutSine',
        duration: 400,
        complete: function(anim){
           flipCard = false;
        }
      });
    });
    
  });
  return (
    <div>
    <div class="front">
    <div class="user-img"></div>
    <h1>{Header}</h1>
    <p class="subheading">{SubHead}</p>
    <ul>
      <li><a href=""><i class="fa fa-linkedin"></i></a></li>
      <li><a href=""><i class="fa fa-github-square"></i></a></li>
      <li><a href=""><i class="fa fa-briefcase"></i></a></li>
    </ul>
  </div>
  
  <div class="back">
    <div class="user-img"></div>
    <p>
      {Description}
    </p>
   </div>
 </div>
);}


