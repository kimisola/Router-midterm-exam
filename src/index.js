import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: [],
            headline:"",
            chapters:"",
        };
    }

    componentDidMount() {
        this.handleServerItemsLoad()
    }

    handleServerItemsLoad = () => {  //get json data

        fetch("https://cwpeng.github.io/live-records-samples/data/content.json", {
            method: "GET"
        }).then((response) => {
            console.log(response)
            return response.json()
        }).then((data) => {
            console.log(data)
            this.setState({ data: data.chapters }) 
            this.setState({ headline: data.headline })
            //如果資料結構寫一樣、可以用 ... data
        })
    }


    render(){

        return(
        <Router>
            <div>
                
               <HomePage data={this.state.data} headline={this.state.headline}/>
            
            </div>
        </Router>
        )
    } 
}
export default App;


class MovePage extends React.Component {
    constructor(props){
        super(props);
    }
    
    render(){   
        let data = this.props.data;
        let chapter = this.props.chapter;
        let newData =[];
        console.log(chapter)
        if ( chapter === "start" ){
            newData = data.filter((element) => {
                if ( element.key === "start" ) {
                    console.log(element)
                    return element
                }
            })
        } 
        else if ( chapter === "react" ){
            newData = data.filter((element) => {
                if ( element.key === "react" ) {
                    console.log(element)
                    return element
                }
            })
        }
        else if  ( chapter === "redux" ){
            newData = data.filter((element) => {
                if ( element.key === "redux" ) {
                    console.log(element)
                    return element
                }
            })
        }
        return(
      
            <div>
                <div>
                { newData.map((data) =>
                    <div className="sections">
                    { data.sections.map((section, i) => <li key={i}>{section}</li>)}
                    </div>
                )}
                </div>
                <br />
                <div> <Link to={"/"}> Home </Link>  </div>
            </div>
        )
    }
}


class HomePage extends React.Component {
    constructor(props){
        super(props);console.log(this.props.data)
    }

    render(){
        
        return(
            <Router>
                <div>
                    { this.props.data.map((data, i) => 
                        <div key={i}>
                            <div className="chapters">
                                <div>
                                    <div> <Link to={data.key}> {data.title} </Link></div>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* <h1>{this.props.headline}</h1> */}

                    {/* exact and switch choose one */}
                    <Switch>
                        <Route exact path="/">
                            <div> <h1>{this.props.headline}</h1> </div>
                        </Route>
                        <Route path="/start">
                            <MovePage data={this.props.data} chapter={"start"}/>
                        </Route>
                        <Route path="/react">
                            <MovePage data={this.props.data} chapter={"react"}/>
                        </Route>
                        <Route path="/redux">
                            <MovePage data={this.props.data} chapter={"redux"}/>
                        </Route>
                    </Switch>

                </div>  
                {/* 前後包夾的 div 可以用 <> </> 取代 或是 <React.Fragment> </React.Fragment> */}
            </Router>
        )
    }
}


// let s = <div> Hello </div>
// 等同於 React.creatElement 的寫法

ReactDOM.render(<App />, document.querySelector("#root"))