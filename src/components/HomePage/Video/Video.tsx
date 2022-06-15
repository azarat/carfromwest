// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React, { useEffect, useState } from 'react'

const Video: React.FC = () => {
  let videoId = 'in9mllvSxo8'
  const [startVideo, setStartVideo] = useState<boolean>(false)

  const [player, setPlayer] = useState<any>(null)

  const playVideo = () => {
    player.playVideo()
  }

  const onPlayerReady = (event: any) => {
    console.log(event)
  }

  const onPlayerStateChange = (event: any) => {
    console.log('Player state change: ', event)
  }

  const onPlayerError = (event: any) => {
    console.log('Player errore change: ', event)

    switch (event.data) {
      case 2:
        console.log('' + videoId)
        break
      case 100:
        break
      case 101 || 150:
        break
    }
  }

  const handleClick = () => {
    setStartVideo(true)
    playVideo()
  }

  const init = () => {
    if (typeof document !== 'undefined') {
      const tag = document.createElement('script')
      tag.src = 'https://www.youtube.com/iframe_api'
      document.body.appendChild(tag)
    }
  }

  useEffect(() => {
    init()
    videoId = 'in9mllvSxo8'
    window['onYouTubeIframeAPIReady'] = (e: any) => {
      const newPlayer = new window['YT'].Player('player', {
        videoId: videoId,
        width: 640,
        height: 360,

        events: {
          onStateChange: onPlayerStateChange,
          onError: onPlayerError,
          onReady: onPlayerReady,
        },
      })
      setPlayer(newPlayer)
    }
  }, [])

  return (
    <section className="video-block">
      <div className="video-block__info">
        <h2 className="video-block__title">
          Подивіться відео та дізнайтесь як ми привозимо авто в Україну
        </h2>
        <p className="video-block__time">Тривалість – 3 хв</p>
      </div>
      <div className="video-block__wrapper">
        <div
          onClick={handleClick}
          className={`${
            startVideo
              ? 'video-block__play-button video-block__play-button--hide'
              : 'video-block__play-button'
          }`}
        >
          <span />
        </div>
        <div className="video-block__video">
          <div
            className={`${
              startVideo
                ? 'video-block__video-image video-block__video-image--hide'
                : 'video-block__video-image'
            }`}
          />
          <div id="player" />
        </div>
      </div>
    </section>
  )
}

export default Video
