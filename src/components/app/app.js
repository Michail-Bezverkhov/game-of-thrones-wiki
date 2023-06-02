import { Component } from 'react';
import { Col, Row, Container } from 'reactstrap';
import './app.sass'
import Header from '../header/header';
import RandomChar from '../randomChar/randomChar';
import ItemList from '../itemList/itemList';
import CharDetails from '../charDetails/charDetails';


const ToggleRandomChar = ({ onClick }) => {
    return <button className="toggle-random-char" onClick={onClick}>Toggle Random Character</button>
};

export default class App extends Component {

    state = {
        randomCharVisible: true
    }

    ToggleFunction = () => {
        this.setState(prevState => ({
            randomCharVisible: !prevState.randomCharVisible
        }));
    };

    render() {
        const { randomCharVisible } = this.state;

        const {ToggleFunction} = this;

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
                            <ToggleRandomChar onClick={ToggleFunction} /> 
                        </Col>
                    </Row>
                    <Row>
                        <Col md='6'>
                            <ItemList />
                        </Col>
                        <Col md='6'>
                            <CharDetails />
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}