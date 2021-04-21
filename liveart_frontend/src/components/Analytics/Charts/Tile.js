import './Tile.css';
require('dotenv').config();

function Tile(props) {
    return(
        <div className="tile">
            <div className={props.accent}/>
            <div className="content">
                <div className="title">{props.title}</div>
                <div className="value">{props.value ? props.prefix : ''}{props.value ? props.value.toFixed(2) : 'N/A'}{props.value ? props.suffix : ''}</div>
            </div>
        </div>
    );
}

export default Tile;