import { TicketStats } from "./ticketStats";
import { TotalTicketsChart } from "./totalTicketsChart";
import { TicketsCategoryChart } from "./ticketsCategoryChart";
import { TicketsStatusChart } from "./ticketsStatusChart";
import { ActionCenter } from "./actionCenter";
import { ExpertsPerformance } from "./expertsPerformance";
import { ActionRequiredTickets } from "./actionRequiredTickets";


const Dashboard = () => {
    return (
        <div className="grid gap-5 lg:gap-7.5">
            <div className="grid grid-cols-4 gap-5 lg:gap-7.5 h-full items-stretch">
                <TicketStats />
            </div>
            <div className="grid grid-cols-3 gap-5 lg:gap-7.5 h-full items-stretch">
                <ActionCenter />
                <div className="lg:col-span-2">
                    <ExpertsPerformance />
                </div>
            </div>
            <ActionRequiredTickets />
            <div className="grid lg:grid-cols-2 gap-y-5 lg:gap-7.5 items-stretch">
                <TicketsStatusChart />
                <TicketsCategoryChart />
            </div>
            <div className="grid gap-y-5 lg:gap-7.5 items-stretch">
                <div className="lg:col-span-2">
                    <TotalTicketsChart />
                </div>
            </div>
            <div>

            </div>


        </div>
    )
}

export default Dashboard;