import { Divider, Typography } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CharactersList from '../Components/CharactersList';
import Loader from '../Components/Loader';
import showErrorModal from '../utils/showErrorModal';

const { Title } = Typography;

const Film = () => {
	const { resourceId } = useParams();
	const [film, setFilm] = useState({
		loading: true,
		data: {},
	});

	const resourceUrl = `https://swapi.dev/api/films/${resourceId}`;

	useEffect(() => {
		const fetchFilm = async () => {
			const response = await axios.get(resourceUrl);
			return response.data;
		};

		const saveFilmInfoToState = async () => {
			try {
				const filmInfo = await fetchFilm();
				setFilm({ data: filmInfo, loading: false });
			} catch (error) {
				setFilm({ data: {}, loading: false });
				showErrorModal();
			}
		};

		saveFilmInfoToState();
	}, [resourceUrl]);

	const renderContent = () => {
		if (film.loading) return <Loader />;
		return (
			<div>
				<div style={{ display: 'flex', flexFlow: 'column', alignItems: 'center' }}>
					<Title style={styles.filmTitle}>{film.data.title + ' - Episode ' + film.data.episode_id}</Title>
				</div>
				<div>
					<Title style={styles.filmInfo} level={4}>
						{film.data.opening_crawl}
					</Title>
					<Title style={styles.filmInfo} level={4}>
						{'Release Date: ' + film.data.release_date}
					</Title>
					<Title style={styles.filmInfo} level={4}>
						{'Director: ' + film.data.director}
					</Title>
					<Title style={styles.filmInfo} level={4}>
						{'Producer: ' + film.data.producer}
					</Title>
				</div>
				<Divider />
				<Title style={styles.filmInfo} level={2}>
					{'Characters List'}
				</Title>
				<Divider />
				<CharactersList charactersEndpoints={film.data.characters} />
			</div>
		);
	};

	const content = renderContent();

	return content;
};

const styles = {
	filmTitle: { color: '#c81a2b', fontWeight: 700 },
	filmInfo: { color: '#ffffff' },
};

export default Film;
