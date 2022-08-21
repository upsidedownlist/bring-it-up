import {ISchool, School} from "../models/school.model";
import {BadRequestError} from "../middleware/bad-request-error";

async function getSchools(identifierQuery: any,
                          nameQuery: any,
                          abbreviationQuery: any,
                          mentalHealthCoverageQuery: any,
                          searchString: any): Promise<ISchool[]> {

    const identifier = identifierQuery ? { identifierQuery: { $regex: identifierQuery, $options: 'i' }} : {};
    const name = nameQuery ? { nameQuery: { $regex: nameQuery, $options: 'i' }} : {};
    const abbreviation = abbreviationQuery ? { abbreviationQuery: { $regex: identifierQuery, $options: 'i' }} : {};
    const mentalHealthCoverage = mentalHealthCoverageQuery ? { mentalHealthCoverageQuery: { $regex: identifierQuery, $options: 'i' }} : {};
    const search = searchString ? { $text: { $search: searchString } } : {};

    const schools = await School.find({ $and: [{ ...identifier,
                                                      ...name,
                                                      ...abbreviation,
                                                      ...mentalHealthCoverage,
                                                      ...search}] })
                                .collation({ locale: 'en', strength: 2 })
                                .lean();

    return schools;
}

async function getSchool(id: string): Promise<ISchool> {
    const school = await School.findOne({identifier: id}).lean();
    if (school == null) {
        throw new BadRequestError();
    }
    return school;
}

async function createSchool(inputSchool: ISchool): Promise<ISchool> {
    const school = School.build(inputSchool);
    return await school.save();
}

async function deleteSchool(id: string) {
    const school = await School.findOne({identifier: id});
    if (school == null) {
        throw new BadRequestError();
    }
    await school.remove();
}

export default {
    getSchools,
    getSchool,
    createSchool,
    deleteSchool
};
