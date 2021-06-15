import '../App.css';

export default function Stations(props) {


    return(
        <div>
            <hr/>
            <h5 className = "name">{props.name}</h5>
            <h5 className = "adddres">{props.addres}</h5>
            <h5 className = "hours">{props.hours}</h5>
            <h5 className = "comments">{props.comments}</h5>
        </div>
    )
}