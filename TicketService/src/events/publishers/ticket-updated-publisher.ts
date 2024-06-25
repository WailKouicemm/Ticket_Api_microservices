import { Publisher, Subjects, TicketUpdatedEvent } from "@wailkouicem/common";
import { Message } from "node-nats-streaming";




export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}