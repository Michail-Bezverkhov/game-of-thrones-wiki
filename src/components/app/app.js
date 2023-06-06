import { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import './app.sass'
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ErrorMessage from '../errorMessage/errorMessage';
import CharacterPage from '../characterPage/characterPage';
import GotService from '../../services/gotService';

export default class App extends Component {

    gotService = new GotService();

    state = {
        randomCharVisible: true,
        error: false
    }

    componentDidCatch() {
        console.log('error');
        this.setState({
            error: true
        })
    }

    ToggleFunction = () => {
        this.setState(prevState => ({
            randomCharVisible: !prevState.randomCharVisible
        }));
    };

    render() {

        if (this.state.error) {
            return <ErrorMessage />
        }

        const { randomCharVisible } = this.state;

        const content = randomCharVisible ? <RandomChar /> : null;

        return (
            <>
                <Container>
                    <Header />
                </Container>
                <Container>
                    <Row>
                        <Col lg={{ size: 5, offset: 0 }}>
                            {content}
                            <button className="toggle-random-char" onClick={this.ToggleFunction}>Toggle Random Character</button>
                        </Col>
                    </Row>
                    <CharacterPage />
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllBooks}
                                renderItem={(item) => (<><span>{item.name}</span><button>click me</button></>)}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList
                                onItemSelected={this.onItemSelected}
                                getData={this.gotService.getAllHouses}
                                renderItem={(item) => item.name}
                            />
                        </Col>
                        <Col md='6'>
                            <CharDetails charId={this.state.selectedChar} />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}