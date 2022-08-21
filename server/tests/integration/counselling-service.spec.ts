import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../index';
import { CounsellingService } from '../../models/counsellingService.model';
import { service1Data, service2Data } from './data/counselling-service-data';
import {StatusCode} from "../../utils/status-code.enum";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const should = chai.should();

chai.use(chaiHttp);

describe('Counselling Services', () => {
    beforeEach(async () => {
        await CounsellingService.deleteMany({});
        const service = new CounsellingService(service1Data);
        await service.save();
    });

    describe('GET /counselling-services', () => {
        it('should get all counselling services', async () => {
            const result = await chai.request(server)
                .get('/counselling-services');
            result.should.have.status(StatusCode.OK);
            result.body.should.be.a('array');
            result.body.length.should.be.eql(1);
        });
    });

    describe('POST /counselling-services', () => {
        it('should create a counselling service', async () => {
            const result = await chai.request(server)
                .post('/counselling-services')
                .send(service2Data);
            result.should.have.status(StatusCode.CREATED);
        });

        it('should reject duplicate services', async () => {
            await chai.request(server)
                .post('/counselling-services')
                .send(service2Data);
            const result = await chai.request(server)
                .post('/counselling-services')
                .send(service2Data);
            result.should.have.status(StatusCode.BAD_REQUEST);
        });
    });

    after(async () => {
        await CounsellingService.deleteMany({});
    });
});
