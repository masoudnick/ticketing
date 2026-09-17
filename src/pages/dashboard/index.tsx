import { ChannelStats } from "./stats";
import { TotalTicketsChart } from "./totalTicketsChart";
import { Contributions } from "./contributions";
import { TicketsCategoryChart } from "./ticketsCategoryChart";
import { ActionCenter } from "./actionCenter";
import { Teams } from "./teams";


const Dashboard = () => {
    return (
        <div className="grid gap-5 lg:gap-7.5">
            <div className="grid grid-cols-4 gap-5 lg:gap-7.5 h-full items-stretch">
                <ChannelStats />
            </div>
            <div className="grid grid-cols-3 gap-5 lg:gap-7.5 h-full items-stretch">
                <ActionCenter />
                <div className="lg:col-span-2">
                    <Teams />
                </div>
                
            </div>
            <div className="grid gap-y-5 lg:gap-7.5 items-stretch">
                <div className="lg:col-span-2">
                    <TotalTicketsChart />
                </div>
            </div>
            <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-7.5 items-stretch">
                <Contributions />
                <TicketsCategoryChart />
            </div>
        </div>
    )
}

export default Dashboard;