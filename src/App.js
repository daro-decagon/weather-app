import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'weather-icons/css/weather-icons.css'
import Weather from './app_component/weather.component';
import Form from './app_component/form.component';

//api.openweathermap.org/data/2.5/weather?q=London,uk
const API_KEY = "eddf18ad34c2b9151d3042c47c2cd514";

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      tempMax: undefined,
      tempMin: undefined,
      description:"",
      error: false
    };

    this.icon = {
      Thunderstorm:"wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp){
    let celsius = Math.floor(temp - 273.15);
    return celsius
  }

  getWeatherIcons(icon, rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.icon.Thunderstorm});
        break;
        case rangeID>=300 && rangeID<=321:
          this.setState({icon:this.icon.Drizzle});
          break;
          case rangeID>=500 && rangeID<=531:
            this.setState({icon:this.icon.Rain});
            break;
            case rangeID>=600 && rangeID<=622:
              this.setState({icon:this.icon.Snow});
              break;
              case rangeID>=701 && rangeID<=781:
                this.setState({icon: this.icon.Atmosphere});
                break;
                case rangeID==800:
                  this.setState({icon: this.icon.Clear});
                  break;
                  case rangeID>=801 && rangeID<=804:
                    this.setState({icon: this.icon.Clouds});
                    break;
                    default:
                      this.setState({icon:this.icon.Clouds})
    }
  }

  getWeather = async(e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country =  e.target.elements.country.value;
    if(city&&country){
    const api_call = await fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+','+country+'&appid='+API_KEY);
    const response = await api_call.json();
    console.log(response);

    this.setState({
      city: response.name,
      celsius: this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description
    });
    this.getWeatherIcons(this.icon, response.weather[0].id)
  }
  else{
    this.setState({error:true});
  }

  }
  
  render(){
    return (
      <div className="App">
        <Form loadweather= {this.getWeather} error={this.state.error}/>
      <Weather city={this.state.city} country={this.state.country} temp_celsius = {this.state.celsius} temp_max = {this.state.temp_max} temp_min = {this.state.temp_min} description = {this.state.description} icon = {this.state.icon}/>
    </div>
    );
  }
}


export default App;
