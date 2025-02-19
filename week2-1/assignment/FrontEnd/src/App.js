import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
    const [dustInfos, setDustInfos] = useState([]);
    const [toggle, setToggle] = useState("ON");

    useEffect(() => {
        setDustInfos([
            { team: "example team 1", value: "0" },
            { team: "example team 2", value: "0" },
        ]);
    }, []);

    const handleReloadClick = async (team) => {
        try {
            const result = await axios.get("http://127.0.0.1:8000/dust");
            console.log(result.data);
            setDustInfos(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleToggle = async () => {
        try {
            const result = await axios.patch("http://127.0.0.1:8000/toggle");
            console.log(result.data);
            setToggle(result.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>미세먼지 정보</h1>
            {dustInfos.map((dustInfo) => (
                <div className="dust-container" key={dustInfo.team}>
                    <div className="dust-info">
                        <div className="dust-level">{dustInfo.team}</div>
                        <div className="dust-value">
                            {dustInfo.value}
                            <span>㎍/㎥</span>
                            
                        </div>
                    </div>
                    <div className="btn-container">
                        <button
                            className="btn"
                            onClick={() => handleReloadClick(dustInfo.team)}
                        >
                            Reload
                        </button>
                        <button className="btn" onClick={() => handleToggle()}>
                            {toggle}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
