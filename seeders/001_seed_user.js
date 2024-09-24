async function up({ context: queryInterface }) {
  await queryInterface.bulkInsert("Users", [
    {
      firstName: "John",
      lastName: "Doe",
      email: "example@example.com",
      age: 30,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

async function down({ context: queryInterface }) {
  await queryInterface.bulkDelete("Users", { email: "example@example.com" });
}

module.exports = { up, down };
