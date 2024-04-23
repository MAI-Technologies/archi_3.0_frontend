import { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// import { ContentWrapper } from "../components/Navbar/NavbarElements";
import { v4 } from 'uuid';
import TutorData from '../components/Tutor/TutorData';
import styles from "./ChatbotPage.module.css";
import ChatInputBar from "../components/ChatInputBar/ChatInputBar";
// import userImage from "../../src/assets/user.png";
import axios from "axios";
import PopupButton from '../components/PopupButton/PopupButton';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { authenticateUser } from '../utils/auth';
import { UserContext } from "../contexts/UserContext";
import { addConvoRequest } from '../requests/addConvoRequest';

const ChatbotPage = ({ onPopupVisibility }) => {
    const { tutorId } = useParams();
    const tutor = TutorData.find((char) => char.id === tutorId);
    const purpose = `I'm here to help you navigate through any math challenges you're facing! 🌟 Do you have a math problem or concept you need help with today? If so, let's solve it together!` // TODO: Get from backend later!
    const [isThinking, setIsThinking] = useState(false);
    const [history, setHistory] = useState([]);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [streaming, setStreaming] = useState(false);
    const [streamText, setStreamText] = useState("");
    const [sessionId, setSessionId] = useState("");
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);
    const [convoHistory, setConvoHistory] = useState([]);
    const [newChat, setNewChat] = useState(true);

    const userImage = () => {
        switch (tutor.name) {
            case "Archi":
                return "/img/archiUser.png";
            case "Hypatia": 
                return "/img/hypatiaUser.png";
            case "Mary J.": 
                return "/img/mjUser.png";
            default:
                return "";
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Must put scrollToBottom in its own useEffect() because putting it in the other one would keep regenerating a new sessionId every stream text
    useEffect(() => {
        scrollToBottom()
    }, [streamText]);

    useEffect(() => {
        authenticateUser().then((user) => {
            if (user == null) return navigate("/login");
            setUser(user);
            // Hide the popup button when the ChatbotPage mounts
            onPopupVisibility(false);

            // create a new session
            setSessionId(v4());
            setLoading(false);
            getConvoHistory(user); // show history on side bar
            setNewChat(true);
            console.log(user);
            console.log(sessionId);
        }).then(err => {
            if (!err) return;
            console.log(err);
            navigate("/login");
        })

        // Show the popup button again when the ChatbotPage unmounts
        return () => {
            onPopupVisibility(true);
        };
    }, [onPopupVisibility]); 

    // For displaying conversations history on the side bar
    async function getConvoHistory(user) {
        try {
            const result = await axios.get("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/get-history", { params: { userId: user.uid } });
            console.log(result.data);
            const convos = result.data.convos;
            // Order from most recent to least recent 
            convos.sort(function(x, y) {
                return Date.parse(y.createdAt) - Date.parse(x.createdAt);
            })

            // Remove oldest convo from history if there are more than five convos
            if (convos.length > 5) {
                await axios.delete("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/delete-convo", { params: { sessionId: convos[convos.length-1].sessionId} });
                convos.pop();
            } 

            // Update conversation history on sidebar
            setConvoHistory(convos);
        } catch (err) {
            console.log(err);
            throw err;
        }
    };

    if (!tutor) {
        return <div> Tutor not found </div>;
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const preprocessMath = (msg) => {
        // Regular expression to match 'x^b' pattern and exclude 'x^{b}'
        const regex = /(\w)\^([^\{])/g;
        return msg.replace(regex, "$1^{$2}");
    };

    async function sendMessageHandler(msg) {
        console.log(sessionId);
        // Format the user input for MathJax if it contains LaTeX
        const formattedMsg = msg.includes("\\") ? `\\(${msg}\\)` : preprocessMath(msg);
        setHistory(prev => [...prev, { isUser: true, msg: formattedMsg }]);
        setStreamText("");
        try {
            setIsThinking(true);

            const res = await fetch("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/openai", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: msg, sessionId: sessionId, tutor: tutor.name, userId: user.uid })
            });

            const data = await res.json();
            console.log("TEST: ")
            console.log(data);

            // setHistory(prev => [...prev, { isUser: false, msg: "" }]);
            /*
            const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .getReader();
            */
            setStreaming(true);
            let completedText = "";
            setIsThinking(false);

            // If the current convo is a new convo, then update side bar and show new convo 
            if (newChat) { // test this more; in the future, if new random convo keeps generating on side bar, this might be the cause
                getConvoHistory(user);
                setNewChat(false);
            }

            setHistory(prev => [...prev, { isUser: false, msg: data }]);
            setStreamText(data);
            setStreaming(false);

            // eslint-disable-next-line no-constant-condition
            /*
            while (true) {
                const { value, done } = await reader.read();
                if (done) {
                    setStreaming(false);
                    setHistory(prev => [...prev, { isUser: false, msg: completedText }]);
                    break;
                }
                console.log(value);
                completedText += value;
                setStreamText(prev => prev + value);
            }*/
        } catch (err) {
            console.log(err);
            setHistory(prev => [...prev, { isUser: false, msg: "Something went wrong on my endpoint, please try again later" }]);
        } finally {
            setIsThinking(false);
        }
    }

    const handlePopupToggle = (isVisible) => {
        console.log("Popup visibility changed to:", isVisible);
        setIsPopupVisible(isVisible);
    };


    const makeFirstLetterLowercase = (str) => {
        if (!str) return str;
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    const config = {
        loader: { load: ['input/tex', 'output/chtml'] },
        tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
    };

    // Load old convo on the screen
    async function loadPastConvo(oldSessionId) {
        try {
            const result = await axios.get("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/get-convo", { params: { sessionId: oldSessionId } });
            const convo = result.data.convo;
            const convos = convo.conversations;
            const newSessionId = v4();
    
            // Navigate to the corresponding tutor page and create a new session
            switch (convo.tutorName.toLowerCase()) {
                case "hypatia":
                    navigate("/chatbot/hypatia");
                    setSessionId(newSessionId);
                    break;
                case "mary j.":
                    navigate("/chatbot/mary_j");
                    setSessionId(newSessionId);
                    break;
                default:
                    navigate("/chatbot/archi");
                    setSessionId(newSessionId);
                    break;
            }
            console.log("NEW SESSION" + newSessionId);

            // Display all previous messages 
            const newConversation = [{ role: "system", content: convos[0].content }, { role: "assistant", content: convos[1].content }];
            setHistory([]);
            for(let i = 2; i < convos.length; i++) {
                const msg = convos[i].content;
                //const formattedMsg = msg.includes("\\") ? `\\(${msg}\\)` : preprocessMath(msg); // look into this line
                const formattedMsg = preprocessMath(msg);
    
                if (convos[i].role === "assistant") {
                    setHistory(prev => [...prev, { isUser: false, msg: formattedMsg }]);
                    newConversation.push({role: "assistant", content: msg});
                } else {
                    setHistory(prev => [...prev, { isUser: true, msg: formattedMsg }]);
                    newConversation.push({role: "user", content: msg});
                }
            }

            // create new convo with old convo info
            await addConvoRequest(newSessionId, convo.userId, convo.summary, convo.tutorName, newConversation);
            // then delete old convo from database
            await axios.delete("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/delete-convo", { params: { sessionId: oldSessionId } });
            
            // Update side bar
            getConvoHistory(user);
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    async function deleteSingleConvo(id) {
        try {
            const answer = window.confirm("Are you sure you want to delete this conversation?");
            if (answer) {
                await axios.delete("https://ebg5arj53no65jmdwx6srlesxm0vxljl.lambda-url.us-east-1.on.aws/user/delete-convo", { params: { sessionId: id} });
                window.location.reload();
            }
        } catch (err) {
            console.log(err);
            throw err;
        }
    }

    return (
        <MathJaxContext config={config}>
            <div className={styles.content}>
                <div className={styles.history} style={{ backgroundImage: `url(${tutor.sideBarSrc})`, backgroundSize: 'cover' }}>
                    <button className={styles.newChat} onClick={() => window.location.href = `/chatbot/${tutor.id}`}>
                        <img src="/img/+.png" alt="plus"></img>
                        New Chat
                    </button>
                    <p className={styles.recent}> Recent </p>
                    <div className={styles.convoHistoryContainer}>
                        {convoHistory.map(convo => (<div className={styles.convoHistoryList}> <p className={styles.convoHistoryItem} id={convo.sessionId} onClick={(e) => loadPastConvo(e.target.id)}>{convo.summary.slice(0, 25)}...</p> <img className={styles.trashcan} id={convo.sessionId} onClick={(e) => deleteSingleConvo(e.target.id)} src="/img/trash.png"/> </div>))}
                    </div>
                </div>
                <div className={`${styles.chatbot} ${isPopupVisible ? styles.chatbotShifted : ''}`}>
                    <div className={styles.output}>
                        <div className={styles.botText}>
                            <div className={styles.profile}>
                                <img src={tutor.imageSrc} alt={tutor.name} />
                            </div>
                            <div className={styles.greeting}>
                                <p> Hi there! It's so nice to meet you! I'm {tutor.name}, {makeFirstLetterLowercase(tutor.description)} </p>
                            </div>
                            <div className={styles.purpose}><p>{purpose}</p></div>

                            {history && history.map((log, i) => {
                                return (
                                    <div key={i} className={styles.logMsg}>
                                        <div className={styles.profile}>
                                            {log.isUser ? <img src={userImage()} alt="user" /> : <img src={tutor.imageSrc} alt={tutor.name} />}
                                        </div>
                                        <div className={styles.msg}>
                                            <MathJax dynamic>{log.msg}</MathJax>
                                        </div>
                                    </div>
                                );
                            })}

                            {isThinking && <div className={styles.logMsg}>
                                <div className={styles.profile}>
                                    <img src={tutor.imageSrc} alt={tutor.name} />
                                </div>
                                <p className={styles.msg}>{tutor.name} is thinking...</p>
                            </div>}
                            {streaming && <div className={styles.logMsg}>
                                <div className={styles.profile}>
                                    <img src={tutor.imageSrc} alt={tutor.name} />
                                </div>
                                <p className={styles.msg}>{streamText}</p>
                            </div>}
                            <div ref={messagesEndRef} />
                        </div>
                        <ChatInputBar tutorColor={tutor.themeColor} sendMessageHandler={sendMessageHandler}></ChatInputBar>
                    </div>
                </div>
            </div>
        </MathJaxContext>
    );
};

export default ChatbotPage;