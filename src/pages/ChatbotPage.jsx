import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ContentWrapper } from "../components/Navbar/NavbarElements";
import { v4 } from 'uuid';
import TutorData from '../components/Tutor/TutorData';
import styles from "./ChatbotPage.module.css";
import ChatInputBar from "../components/ChatInputBar/ChatInputBar";
import userImage from "../../src/assets/user.png";
// import axios from "axios";
import PopupButton from '../components/PopupButton/PopupButton';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

// function getSessionId() {
//     if (sessionStorage.getItem("token") == null || sessionStorage.getItem("token") === "") {
//         sessionStorage.setItem("token", v4());
//     }

//     return sessionStorage.getItem("token");
// }


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

    useEffect(() => {
        // Hide the popup button when the ChatbotPage mounts
        onPopupVisibility(false);

        // create a new session
        setSessionId(v4());

        // Show the popup button again when the ChatbotPage unmounts
        return () => {
            onPopupVisibility(true);
        };
    }, [onPopupVisibility]);

    if (!tutor) {
        return <div> Tutor not found </div>;
    }
    const preprocessMath = (msg) => {
        // Regular expression to match 'x^b' pattern and exclude 'x^{b}'
        const regex = /(\w)\^([^\{])/g;
        return msg.replace(regex, "$1^{$2}");
    };

    async function sendMessageHandler(msg) {
        // Format the user input for MathJax if it contains LaTeX
        const formattedMsg = msg.includes("\\") ? `\\(${msg}\\)` : preprocessMath(msg);
        setHistory(prev => [...prev, { isUser: true, msg: formattedMsg }]);
        setStreamText("")
        try {
            setIsThinking(true);

            const res = await fetch("https://archi2-backend-d33aae681e67.herokuapp.com/openai", {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/event-stream',
                },
                body: JSON.stringify({ prompt: msg, sessionId: sessionId, tutor: tutor.name })
            });

            // setHistory(prev => [...prev, { isUser: false, msg: "" }]);
            const reader = res.body
                .pipeThrough(new TextDecoderStream())
                .getReader()
            setStreaming(true);
            let completedText = "";
            setIsThinking(false);

            // eslint-disable-next-line no-constant-condition
            while (true) {
                const { value, done } = await reader.read()
                if (done) {
                    setStreaming(false);
                    setHistory(prev => [...prev, { isUser: false, msg: completedText }]);
                    break;
                }

                completedText += value;
                setStreamText(prev => prev + value);
            }
        } catch (err) {
            console.log(err);
            setHistory(prev => [...prev, { isUser: false, msg: "Something went wrong on my endpoint, please try again later" }]);
        } finally {
            setIsThinking(false);
        }
    }


    if (!tutor) {
        return <div> Tutor not found </div>;
    }

    const handlePopupToggle = (isVisible) => {
        console.log("Popup visibility changed to:", isVisible);
        setIsPopupVisible(isVisible);
    };


    const makeFirstLetterLowercase = (str) => {
        if (!str) return str;
        return str.charAt(0).toLowerCase() + str.slice(1);
    };

    /* For auto-scrolling to the latest message */
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom()
    }, [streamText]);

    const config = {
        loader: { load: ['input/tex', 'output/chtml'] },
        tex: { inlineMath: [['$', '$'], ['\\(', '\\)']] },
    };

    return (
        <MathJaxContext config={config}>
        <ContentWrapper>
            <div className={styles.content}>
                <div className={styles.history} style={{ backgroundColor: tutor.themeColor }}>
                    <button className={styles.newChat} onClick={() => window.location.href = `/chatbot/${tutor.id}`}>
                        <img src="/img/+.png" alt="plus"></img>
                        New Chat
                    </button>
                    <p className={styles.recent}> Recent </p>
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
                                            {log.isUser ? <img src={userImage} alt="user" /> : <img src={tutor.imageSrc} alt={tutor.name} />}
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
                    <div className={styles.help}>
                        <PopupButton
                            onToggle={handlePopupToggle}
                            buttonText="?"
                            buttonTextColor={tutor.themeColor}
                            text="FAQs"
                            extraContent="How can I use ArchI?"
                        >
                        </PopupButton>
                    </div>
                </div>
            </div>
        </ContentWrapper>
        </MathJaxContext>
    );
};

export default ChatbotPage;
