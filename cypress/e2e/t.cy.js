import { faker } from '@faker-js/faker';

describe('Booking API Test', () => {
    let authToken;
    let bookingId;
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    it('Create Token request', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/auth',
            body: {
                username: 'admin',
                password: 'password123',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('token');
            authToken = response.body.token;
        });
    });

    it('Create Booking request', () => {
        cy.request({
            method: 'POST',
            url: 'https://restful-booker.herokuapp.com/booking',
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
            body: {
                firstname: firstName,
                lastname: lastName,
                totalprice: 123,
                depositpaid: true,
                bookingdates: {
                    checkin: '2024-01-01',
                    checkout: '2024-01-05',
                },
                additionalneeds: 'Breakfast',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            bookingId = response.body.bookingid;
            expect(response.body.booking).to.have.property('firstname');
            expect(response.body.booking).to.have.property('lastname');
            expect(response.body.booking.firstname).to.eq(firstName);
            expect(response.body.booking.lastname).to.eq(lastName);
            expect(response.body.booking.additionalneeds).to.eq('Breakfast');
        });
    });

    it('Get Booking request', () => {
        cy.request({
            method: 'GET',
            url: `https://restful-booker.herokuapp.com/booking/${bookingId}`,
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('firstname');
            expect(response.body).to.have.property('lastname');
            expect(response.body.firstname).to.eq(firstName);
            expect(response.body.lastname).to.eq(lastName);
            expect(response.body).to.have.property('additionalneeds');
            expect(response.body.additionalneeds).to.eq('Breakfast');
        });
    });
});












