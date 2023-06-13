import React, { useState } from 'react';
import { Col, Row, Container } from 'reactstrap';
import './app.sass'
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import CharactersPage from '../pages/charactersPage';
import HousePage from '../pages/housesPage';
import HousesItem from '../pages/housesItem';
import BooksPage from '../pages/booksPage';
import BooksItem from '../pages/booksItem';
import CharactersItem from '../pages/charactersItem';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    const [randomCharVisible, setRandomCharVisible] = useState(true);

    const toggleFunction = () => {
        setRandomCharVisible(!randomCharVisible);
    };

    const content = randomCharVisible ? <RandomChar interval={5000} /> : null;

    return (
        <Router basename="/game-of-thrones-wiki">
            <div className='app'>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Routes>
                        <Route index path='/'
                            element={
                                <Row>
                                    <Col lg={{ size: 6, offset: 0 }}>
                                        {content}
                                        <button className="toggle-random-char" onClick={toggleFunction}>Toggle Random Character</button>
                                    </Col>
                                </Row>
                            }>
                        </Route>
                        <Route path='/characters/' element={<CharactersPage />} />
                        <Route path='/characters/:itemId' element={<CharactersItem />} />
                        <Route path='/houses/' element={<HousePage />} />
                        <Route path='/houses/:itemId' element={<HousesItem />} />
                        <Route path='/books/' exact element={<BooksPage />} />
                        <Route path='/books/:itemId' element={<BooksItem />} />
                    </Routes>
                </Container>
            </div>
        </Router>
    )
}

export default App;