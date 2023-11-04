import React from "react";
import { useEffect,useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Card } from "../components/Card";
export const Home = () => {
  
  const[search,setSearch]= useState('')
  const [foodCat,setFoodCat]= useState([]);
  const[foodItem,setFoodItem]= useState([]);

  const loadData= async()=>{
    let response = await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        "Content-Type": 'application/json'
      }
    })

    response= await response.json();

    //console.log(response[0],response[1])
    setFoodItem(response[0])
    setFoodCat(response[1])
  }

  useEffect(()=>{
    loadData()
  },[])
   
  return (
    <>
      <div><Navbar /></div>
      <div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{objectFit:"contain !important"}}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{"z-index":"10"}}>
            <div class="d-flex justify-content-center">
              <input
                class="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e)=>{setSearch(e.target.value)}}
              />
             
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="https://source.unsplash.com/random/300×300/?pizza"
              className="d-block w-100"
              alt="..."
              style={{filter: "brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?cake"
              className="d-block w-100"
              alt="..."
              style={{filter: "brightness(30%)"}}
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://source.unsplash.com/random/300×300/?burger"
              className="d-block w-100"
              alt="..."
              style={{filter: "brightness(30%)"}}
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      </div>
      <div className="container">
        {
          foodCat.map((data)=>{
            return (<div className= 'row mb-3'>
            <div key={data._id} className="fs-3 m-3">
              {data.CategoryName} 
              </div>
              <hr/>
              {foodItem.length > 0 ? (
              foodItem
                .filter((filterItems) => {
                  return (
                    filterItems.CategoryName === data.CategoryName &&
                    filterItems.name.toLowerCase().includes(search.toLowerCase())
                  );
                })
                .map((filteredItem) => {
                  return (
                    <div key={filteredItem._id} className="col-12 col-md-6 col-lg-3">
                      <Card foodItem={filteredItem}
                        //foodName={filteredItem.name}
                        options={filteredItem.options[0]}
                        //imgsrc={filteredItem.img}
                      />
                    </div>
                  );
                })
            ) : <div>  No Such Data found</div>}

              </div>
            )
          })
        }
       
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
};
