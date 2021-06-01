import React from 'react'

const WorkSum: React.FC = () => {
  return (
    <section className="work-sum">
      <div className="work-sum__wrapper">
        <span />
        <div className="work-sum__num">
          <h4 className="work-sum__num-title">Итоги нашей работы в цифрах</h4>
          <div className="work-sum__stats">
            <div className="work-sum__stats-auto">
              <div className="work-sum__stats-number">5000+</div>
              <p className="work-sum__stats-text">Привезено машин</p>
            </div>
            <div className="work-sum__stats-year">
              <div className="work-sum__stats-number">5 лет</div>
              <p className="work-sum__stats-text">На рынке Украины</p>
            </div>
            <div className="work-sum__stats-money">
              <div className="work-sum__stats-number">20565000 $</div>
              <p className="work-sum__stats-text">
                Сэкономлено денег клиентами
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSum
