const Spinner = (): JSX.Element => {
  return (
    <div id="loader-wrapper">
      <div className="loader">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="subline"></div>
        <div className="loader-circle-1">
          <div className="loader-circle-2"></div>
        </div>
        <div className="needle"></div>
        <div className="loading">Загрузка</div>
      </div>
    </div>
  )
}

export default Spinner
