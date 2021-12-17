
const GenericCard = (): JSX.Element => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{"The Beatles"}</h5>
                <p className="card-text">{"Lead guitarist"}</p>
                <p className="card-text">{"Here I got to"}</p>
                <p className="card-text">{"Aug 2018 - Dec 2022"}</p>
            </div>
        </div>
    )
}

export default GenericCard;