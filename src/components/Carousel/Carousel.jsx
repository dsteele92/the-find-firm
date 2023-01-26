import { React, useState, useEffect, useRef } from 'react';
import Style from './carousel.module.scss';
import { useSwipeable } from 'react-swipeable';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

export default function Carousel(props) {
	const [display, setDisplay] = useState(0);
	const [paused, setPaused] = useState(false);

	useEffect(() => {
		const timer = setTimeout(() => {
			if (!paused) {
				setDisplay(display === 2 ? 0 : display + 1);
			}
		}, 5000);
		return () => clearTimeout(timer);
	}, [display, paused]);

	const displayArrowForward = () => {
		setDisplay(display === 2 ? 0 : display + 1);
	};
	const displayArrowBack = () => {
		setDisplay(display === 0 ? 2 : display - 1);
	};

	const handlers = useSwipeable({
		onSwipedRight: displayArrowBack,
		onSwipedLeft: displayArrowForward,
	});

	return (
		<div className={Style.Outer}>
			<div
				className={Style.Carousel}
				{...handlers}
				onMouseEnter={() => setPaused(true)}
				onMouseLeave={() => setPaused(false)}>
				<div className={Style.Inner} style={{ transform: `translateX(-${display * 100}%)` }}>
					{props.children.map((child, index) => (
						<div className={Style.Child} key={index}>
							<img src={child.img} alt='Caruso' />
							<h4>{child.header}</h4>
							<p>{child.text}</p>
						</div>
					))}
				</div>
			</div>
			<div className={Style.Buttons}>
				<IoIosArrowBack className={Style.Arrows} onClick={displayArrowBack} />
				<div className={display === 0 ? Style.CircleActive : Style.Circle} onClick={() => setDisplay(0)}></div>
				<div className={display === 1 ? Style.CircleActive : Style.Circle} onClick={() => setDisplay(1)}></div>
				<div className={display === 2 ? Style.CircleActive : Style.Circle} onClick={() => setDisplay(2)}></div>
				<IoIosArrowForward className={Style.Arrows} onClick={displayArrowForward} />
			</div>
		</div>
	);
}
