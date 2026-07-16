import './AlertBox.css'

type AlertBoxProps = {
    title: string,
    content: string,
    active: boolean
}

function AlertBox({ title, content, active }: AlertBoxProps) {

    if (document.getElementById('alertBox')) {
        document.getElementById('alertBox')!.style.display = "block"
    }

    return (<>
        <div id="alertBox" style={{ display: "block" }}>
            <div id="alertBoxText">
                <h1>{title}</h1>
                <h2>{content}</h2>
                {active ?
                    <button className="requestButton" onClick={() => { document.getElementById("alertBox")!.style.display = "none"; window.location.reload() }}>Accept</button> :
                    <button className="requestButton" onClick={() => { document.getElementById("alertBox")!.style.display = "none"; }}>Accept</button>}
            </div>
        </div></>
    )
}

export default AlertBox