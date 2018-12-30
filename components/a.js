class App extends React.Component {
    constructor(props) {
        super(props);
        
        this.moods = [
            { name: "Happy", "emoji": "😀" }, 
            { name: "Angry", "emoji": "😠" },
            { name: "Really Angry", "emoji": "😡" },
            { name: "Sad", "emoji": "🙁" },
            { name: "Really Sad", "emoji": "☹️" },
            { name: "Poop", "emoji": "💩" }
        ];
        
        this.state = {
            mood: { 
                name: "[ Emoji Placeholder ]", 
                emoji: null 
            }
        }
    }
    
    handleButtonClick() {
        const mood = this.moods[Math.floor(Math.random()*this.moods.length)];
        this.setState({ mood });
    }
    
    render() {
        return (
            <div className="App">
                <MoodView mood={ this.state.mood } />
                <MoodButton mood={ this.state.mood } onButtonClick={ this.handleButtonClick.bind(this) } />
            </div>
        )
    }
}
                    
function MoodView({ mood }) {
    return (
        <div className="Mood">
            <div className="Mood__emoji">{ mood.emoji }</div>
            <div className="Mood__name">{ mood.name }</div>
        </div>
    )
}
                    
function MoodButton({ onButtonClick, mood }) {
    return (
        <div className="MoodButton">
            <button className="Mood__button" onClick={ onButtonClick }>
                Random Mood - { mood.name }
            </button>
        </div>
    )
}

// Mount the App container to a root element
React.render(<App />, document.getElementById('App'))