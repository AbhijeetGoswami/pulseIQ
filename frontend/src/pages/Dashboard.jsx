

import Loader from "../components/Loader/Loader";
import ErrorCard from "../components/ErrorCard/ErrorCard";
import Panel from "../components/common/Panel/Panel";

import SummaryCards from "../components/dashboard/SummaryCards/SummaryCards";
import AttentionLeaderboard from "../components/dashboard/AttentionLeaderboard/AttentionLeaderboard";
import TrendLeaderboard from "../components/dashboard/TrendLeaderboard/TrendLeaderboard";

import useAttention from "../hooks/useAttention";
import useTrends from "../hooks/useTrends";

import "./Dashboard.css";

export default function Dashboard() {

    const {
        data,
        loading,
        error
    } = useAttention();

    const {
        data: trendData,
        loading: trendsLoading,
        error: trendsError
    } = useTrends();

    if (loading || trendsLoading) {
        return <Loader />;
    }

    if (error || trendsError) {
        return <ErrorCard />;
    }

    const attention = data.attention;

    // return (

    //     <div>

    //         <div className="dashboard">

    //         <h1>PulseIQ Dashboard</h1>

    //         <SummaryCards
    //             summary={attention.summary}
    //             domains={attention.domains}
    //             categories={attention.categories}
    //         />

    //         <div className="dashboard-grid">

    //             <AttentionLeaderboard
    //                 entities={attention.entities}
    //             />

    //             <TrendLeaderboard
    //                 trends={trendData?.trends || []}
    //             />

    //         </div>

    //         <div className="dashboard-grid-bottom">

    //             <Panel title="Domains">

    //                 Coming next...

    //             </Panel>

    //             <Panel title="Categories">

    //                 Coming next...

    //             </Panel>

    //         </div>

    //     </div>

    //     </div>

    // );


        return (

        <div className="dashboard">

            {/* <div className="dashboard-title">

                <h1>PulseIQ Intelligence</h1>

                <p>
                    Live attention and trend intelligence across your monitored articles.
                </p>

            </div> */}

            <SummaryCards
                summary={attention.summary}
                domains={attention.domains}
                categories={attention.categories}
            />

            <div className="dashboard-main">

                <AttentionLeaderboard
                    entities={attention.entities}
                />

                <TrendLeaderboard
                    trends={trendData?.trends || []}
                />

            </div>

            <div className="dashboard-bottom">

                <Panel title="Domains">

                    {
                        attention.domains.map(domain => (

                            <div key={domain.id}>

                                <strong>{domain.name}</strong>

                                <span style={{float:"right"}}>

                                    {domain.mentions} mentions

                                </span>

                            </div>

                        ))
                    }

                </Panel>

                <Panel title="Categories">

                    {
                        attention.categories.map(category => (

                            <div key={category.id}>

                                <strong>{category.name}</strong>

                                <span style={{float:"right"}}>

                                    {category.mentions}

                                </span>

                            </div>

                        ))
                    }

                </Panel>

            </div>

        </div>

        );

}


