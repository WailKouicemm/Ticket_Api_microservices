

import {  Publisher, Subjects, TicketCreatedEvent } from "@wailkouicem/common";





export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}

