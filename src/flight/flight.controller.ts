import { Body, Controller, Get, Param, Post, Put, Delete } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { MessagePattern, Payload } from '@nestjs/microservices/decorators';
import { FlightMSG } from 'src/common/constants';
@Controller()
export class FlightController {

    constructor(private readonly flightService: FlightService) { }

    @MessagePattern(FlightMSG.CREATE)
    create(@Payload() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @MessagePattern(FlightMSG.FIND_ALL)
    findAll() {
        return this.flightService.findAll();
    }

    @MessagePattern(FlightMSG.FIND_ONE)
    findOne(@Payload('id') id: string) {
        return this.flightService.findOne(id);
    }

    @MessagePattern(FlightMSG.UPDATE)
    update(@Payload() payload: any) {
        return this.flightService.update(payload.id, payload.flightDTO);
    }

    @MessagePattern(FlightMSG.DELETE)
    delete(@Payload('id') id: string) {
        return this.flightService.delete(id);
    }

    @MessagePattern(FlightMSG.ADD_PASSENGER)
    async addPassenger(@Payload() payload: any) {
        return this.flightService.addPassenger(payload.flightId, payload.passengerId);
    }
}
