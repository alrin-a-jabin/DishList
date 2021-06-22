import React from "react";

const DishItem = (props) => {
  return (
    <main id="main">
      <section id="MyProfile" className="MyProfile">
        <div className="container" data-aos="fade-up">
          <div className="row ">
            {props.selectedData?.map((element, index) => (<>
              <div key={index} className="card">
                <div className="card-body">
                  <div className="col-lg-12 d-flex flex-column ">
                    <div className="row ">
                      <div className="col-lg-8">
                        <h3 className="heading-secondary float-left mb-4" >{element.dishName}</h3>
                        <div className="row mb-2">
                          <div className="col-lg-10 col-sm-12">{element.dishCurrency}{element.dishPrice}
                          </div>
                          <div className="col-lg-2 col-sm-12"> {element.dishCalories} calories
                          </div>
                        </div>
                        <div className="mb-3"> {element.dishDescription}
                        </div>

                        <div className="count_button mb-3 c_white">
                          <i onClick={() => props.deleteCount(index)} class="bi bi-dash-lg count_minus"></i>  {element.count} <i onClick={() => props.addCount(index)} class="bi bi-plus count_plus"></i>
                        </div>
                        {element.addonCat?.length > 0 ? <div className="customization_color">Customization available</div> : ""}
                      </div>
                      <div className="col-lg-4">
                        <img
                          src={element.dishImage}
                          alt="project img"
                          height="300px"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>))}
          </div>
        </div>
      </section>
    </main >

  );
};



export default DishItem;
