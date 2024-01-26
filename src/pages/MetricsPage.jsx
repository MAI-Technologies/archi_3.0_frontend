import { useRef, useState } from 'react';
import { useNavigate } from "react-router-dom"
import styles from "./MetricsPage.module.css";
import { metricsRequest } from '../request/metricsRequest';

export default function MetricsPage() {
    const [lockedPage, setLockedPage] = useState(true);
    const navigate = useNavigate();
    const passwordRef = useRef();
    const startDateRef = useRef();
    const endDateRef = useRef();
    const [metrics, setMetrics] = useState([]);
    const [madeRequest, setMadeRequest] = useState(false);
    const accordionDiv = useRef();

    async function submitPasswordHandler(e) {
        e.preventDefault();

        const password = passwordRef.current.value;
        if (!password) return;

        if (password !== "abc123") {
            alert("Invalid password");
            return navigate("/")
        }

        setLockedPage(false);
    }

    async function submitMetricsHandler(e) {
        e.preventDefault();

        const startDate = startDateRef.current.value;
        const endDate = endDateRef.current.value;

        if (!startDate || !endDate) return;

        try {
            const data = await metricsRequest(startDate, endDate);
            console.log(data);
            setMetrics(data);
            setMadeRequest(true);
        } catch (err) {
            console.log(err);
        }
    }

    if (lockedPage) {
        return <div className={styles.flexContainer}>
            <form onSubmit={submitPasswordHandler}>
                <label>Password</label><br></br>
                <input type='password' ref={passwordRef} />
                <button>Submit</button>
            </form>
        </div>
    }

    return <div className={styles.flexContainer}>
        <form onSubmit={submitMetricsHandler}>
            <label>Start Date</label><br></br>
            <input type='date' ref={startDateRef} /><br></br>

            <label>End Date</label><br></br>
            <input type='date' ref={endDateRef} /><br></br>

            <button>Submit</button>
        </form><br></br>
        {metrics.length > 0 ? <div ref={accordionDiv} className={styles.metrics}>
            <div className={styles.totalSessions}>{metrics.length} sessions found</div>
            {metrics.map(metric => {
                return <div key={metric.id} className={styles.metricDiv}>
                    <div className={styles.title}><strong>Session Id</strong>: {metric.sessionId}</div>
                    <div className={styles.desc}>
                        <div><strong>Total message received</strong>: {metric.totalMessageSent}</div>
                        <div><strong>Total message sent</strong>: {metric.totalMessageReceived}</div>
                        <div><strong>Average AI response time</strong>: {metric.averageAIResponseTime}ms</div>
                        <div><strong>First session</strong>: {new Date(metric.createdAt).toString()}</div>
                        <div><strong>Last session</strong>: {new Date(metric.updatedAt).toString()}</div><br></br>
                        <div><strong>Chat Logs</strong></div>
                        <div className={styles.chatlogs}><br></br>
                            {metric.messageHistory.map((chat, i) => {
                                return <div key={i} className={styles.log}>
                                    <div className={styles.userLog}><strong>User</strong>: {chat.user}</div>
                                    <div className={styles.botLog}><strong>Bot</strong>: {chat.bot}</div>
                                    <div className={styles.timeLog}><strong>Time</strong>: {new Date(chat.timestamp).toString()}</div>
                                </div>
                            })}<hr></hr>
                        </div>
                    </div>
                </div>
            })}</div> : madeRequest && <div className={styles.totalSessions}>No Sessions Found</div>}

    </div>
}