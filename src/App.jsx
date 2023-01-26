import { React, useState, useEffect, useRef } from 'react';
import Style from './app.module.scss';
import { useIsIntersecting, Carousel } from 'components';
import { projects } from './ProjectsData.js';

import LogoSmall from './assets/logo_small.png';
import LogoWhite from './assets/THE_FIND_SQUARE_FINAL.png';
import Banner1 from './assets/banner1.jpg';
import Banner2 from './assets/banner2.jpg';
import Banner3 from './assets/banner3.jpg';
import pvImage from './assets/palisades_village.jpg';
import carusoImage from './assets/caruso.jpeg';
import mbImage from './assets/miramar_beach_resort.jpeg';

import { BsArrowDownCircle, BsLinkedin, BsFillTelephoneFill } from 'react-icons/bs';
import { MdEmail, MdKeyboardArrowRight } from 'react-icons/md';
import { FiArrowRight, FiArrowLeft } from 'react-icons/fi';

function App() {
	const [background, setBackground] = useState(1);
	// const [display, setDisplay] = useState(0);
	const header = useRef();
	const container = useRef();

	const [section1, sectionOneIntersecting] = useIsIntersecting({ threshold: 0.5 });
	const [section2, sectionTwoIntersecting] = useIsIntersecting({ threshold: 0.5 });
	const [section3, sectionThreeIntersecting] = useIsIntersecting({ threshold: 0.5 });

	const backgroundImages = [
		{ id: 1, image: Banner1 },
		{ id: 2, image: Banner2 },
		{ id: 3, image: Banner3 },
	];

	useEffect(() => {
		const containerRef = container.current;
		const handleScroll = (event) => {
			const currentScroll = containerRef.scrollTop;

			let currentHeight = window.innerWidth > 468 ? 300 : 250;
			if (window.innerHeight < 600) {
				currentHeight = 200;
			}
			header.current.style.height = `${currentHeight + currentScroll / 2}px`;
			header.current.style.opacity = `${1 - currentScroll / window.innerHeight}`;
		};
		containerRef.addEventListener('scroll', handleScroll);

		return () => {
			containerRef.removeEventListener('scroll', handleScroll);
		};
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setBackground(background === 3 ? 1 : background + 1);
		}, 5000);
		return () => clearTimeout(timer);
	}, [background]);

	const scrollToOne = () => {
		container.current.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};
	const scrollToTwo = () => {
		container.current.scrollTo({
			top: window.outerHeight,
			behavior: 'smooth',
		});
	};
	const scrollToThree = () => {
		container.current.scrollTo({
			top: window.outerHeight * 2,
			behavior: 'smooth',
		});
	};

	return (
		<div className={Style.App}>
			{backgroundImages.map((obj) => (
				<div
					key={obj.id}
					className={`${Style.Background} ${background === obj.id ? Style.Current : ''}`}
					style={{ backgroundImage: `url(${obj.image})` }}></div>
			))}
			<nav>
				<div
					className={`${Style.Circle} ${sectionOneIntersecting ? Style.Active : ''}`}
					onClick={scrollToOne}></div>
				<div
					className={`${Style.Circle} ${sectionTwoIntersecting ? Style.Active : ''}`}
					onClick={scrollToTwo}></div>
				<div
					className={`${Style.Circle} ${sectionThreeIntersecting ? Style.Active : ''}`}
					onClick={scrollToThree}></div>
			</nav>
			<div className={Style.Container} ref={container}>
				<section className={Style.Top} ref={section1}>
					<img ref={header} className={Style.LogoLarge} src={LogoWhite} alt='Find Firm logo' />
					<div className={Style.Scroll} onClick={scrollToTwo}>
						<BsArrowDownCircle className={Style.Arrow} />
						<p className={Style.Click}>Click to scroll</p>
						<p className={Style.Tap}>Tap to scroll</p>
					</div>
				</section>

				<section className={Style.Content} ref={section2}>
					<div className={Style.ProjectsDisplay}>
						<h2>
							{
								'The people I’ve placed have played pivotal roles in helping build some of California’s most iconic Commercial and Civil Construction projects. Here’s just a few of them...'
							}
						</h2>
						<div className={Style.ProjectsFullScreen}>
							{projects.map((project, index) => (
								<a
									href='https://www.linkedin.com/in/ingallsandrew/details/featured/'
									target='_blank'
									rel='noopener noreferrer'
									key={index}>
									<div className={Style.Project}>
										<img src={project.img} alt='Caruso' />
										<h4>{project.header}</h4>
										<p>{project.text}</p>
									</div>
								</a>
							))}
						</div>
						<div className={Style.ProjectsSmallScreen}>
							<Carousel children={projects} />
						</div>
						<div className={Style.SeeAll}>
							<a
								href='https://www.linkedin.com/in/ingallsandrew/details/featured/'
								target='_blank'
								rel='noopener noreferrer'
								className={Style.ProjectsButton}>
								<p>See all featured projects</p>
								<MdKeyboardArrowRight className={Style.Icon} />
							</a>
						</div>
						<img className={Style.LogoSmall} src={LogoSmall} alt='Find Firm LLC logo' />
					</div>
					<div className={Style.Scroll} onClick={scrollToThree}>
						<BsArrowDownCircle className={Style.Arrow} />
						<p>Contact</p>
					</div>
				</section>

				<section className={Style.Contact} ref={section3}>
					<div className={Style.Card}>
						<h2>Andrew D. Ingalls</h2>
						<h4>
							Principal <br />
							The Find Firm, LLC
						</h4>
						<p>Get in touch</p>
						<div className={Style.Icons}>
							<a href='tel:3104014200'>
								<div className={Style.SpinButton}>
									<BsFillTelephoneFill className={Style.Icon} />
								</div>
							</a>
							<a href='mailto:andrew@thefindfirm.com'>
								<div className={Style.SpinButton}>
									<MdEmail className={Style.Icon} />
								</div>
							</a>
							<a
								href='https://www.linkedin.com/in/ingallsandrew/'
								target='_blank'
								rel='noopener noreferrer'>
								<div className={Style.SpinButton}>
									<BsLinkedin className={Style.Icon} />
								</div>
							</a>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

export default App;
