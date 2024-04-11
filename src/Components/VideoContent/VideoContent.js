import React from 'react';
import s from './VideoContent.module.css';//Стили

function VideoContent(props){
	return(
		<section className={s.content_wrapper}>
			<img src="images/home/video_bg.svg" alt="Фон" className={s.image_bg}/>
			<div className={s.content_block}>
				<p className={s.content_header}>
					About The Shop
				</p>
				<h2 className={s.content_title}>
					Watch Our Story
				</h2>
				<p className={s.content_description}>
					There is no magic formula to write perfect ad copy. It is based on a number of factors, including ad placement, demographic, even the consumer’s mood.
				</p>
				<div className={s.button_green}>
					<div className={s.play_video}>

					</div>
				</div>
			</div>
		</section>
	)
}
export default VideoContent;