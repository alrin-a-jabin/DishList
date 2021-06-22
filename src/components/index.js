import React, { Component } from "react";
import { Nav, NavItem, NavLink, TabContent, Badge } from "reactstrap";
import DishItem from "./partials/dishItem";
import { dashboardService } from "../service/index";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      tabs: [],
      selectedData: [],
      cartCount: 0
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    try {
      dashboardService.getAllDishList().subscribe(
        (response) => {
          try {
            if (response) {
              if (
                Array.isArray(response) &&
                response?.length > 0
              ) {

                const data = response;
                const tableData = [];
                data[0]?.table_menu_list.forEach((tabsList, index) => {
                  let dishArray = [];
                  tabsList.category_dishes.forEach((dishList) => {
                    const dishObject = {
                      dishName: dishList.dish_name,
                      dishPrice: dishList.dish_price,
                      dishImage: dishList.dish_image,
                      dishCurrency: dishList.dish_currency,
                      dishCalories: dishList.dish_calories,
                      dishDescription: dishList.dish_description,
                      count: 0,
                      addonCat: dishList.addonCat,
                    };
                    dishArray.push(dishObject);
                  });
                  const subRows = {
                    id: index,
                    title: tabsList.menu_category,
                    subRows: dishArray
                  }
                  tableData.push(subRows);
                });
                this.setState({ tabs: tableData }, () => {
                  this.setState({ selectedData: this.state.tabs[this.state.activeTab].subRows })
                });
              }
            }
          } catch (error) {
            console.log(error.message);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error?.message);
    }

  }

  renderTab = (tab, dishData) => {
    this.setState({ activeTab: tab, selectedData: dishData });
  };

  addCount = (index) => {
    let team = [...this.state.tabs];
    team[this.state.activeTab].subRows[index]["count"] = team[this.state.activeTab].subRows[index]["count"] + 1;
    this.setState({ tabs: [...team], cartCount: this.state.cartCount + 1 })
  }

  deleteCount = (index) => {
    let team = [...this.state.tabs];
    if (team[this.state.activeTab].subRows[index]["count"] > 0) {
      team[this.state.activeTab].subRows[index]["count"] = team[this.state.activeTab].subRows[index]["count"] - 1;
      this.setState({ tabs: [...team], cartCount: this.state.cartCount - 1 })
    }
  }

  render() {
    const {
      state: { activeTab, tabs, selectedData, cartCount },
      addCount,
      deleteCount
    } = this;
    return (<>
      <header id="header" className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <div className="logo me-auto">
            <h1>
              Uni Resto Cafe
            </h1>
          </div>
          <div className="navbar">
            <i class="bi bi-cart3"></i><Badge color="danger count_bg">{cartCount}</Badge>
          </div>
        </div>
      </header>
      <div className="container-fluid">
        <div className="row no-gutters">
          <Nav tabs id="myTotalTab">
            {tabs.map((tab) => (
              <NavItem key={tab.id}>
                <NavLink
                  className={`${activeTab === tab.id ? "active" : " "
                    }  c-pointer nav-link cursor-pointer`}
                  onClick={() => this.renderTab(tab.id, tab.subRows)}
                  role="button"
                >
                  {tab.title}
                </NavLink>
              </NavItem>
            ))}
          </Nav>
          <TabContent activeTab={activeTab} className="p-3">
            <div className="All_Graph_box">
              <DishItem
                selectedData={selectedData}
                addCount={addCount}
                deleteCount={deleteCount} />
            </div>
          </TabContent>

        </div>
      </div>
    </>
    );
  }
}

export default Dashboard;
