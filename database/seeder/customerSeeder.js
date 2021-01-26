const Customer = require("../../models/Customer");

async function getCustomers() {
  try {
    const customers = await Customer.find();
    return { data: customers, error: null };
  } catch (err) {
    return { data: null, error: error.message };
  }
}

async function createCustomer(data) {
  try {
    const customer = await Customer.create({ ...data, isGold: false });
    return { data: customer, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function getCustomer(id) {
  try {
    const customer = await Customer.findById(id);
    return { data: customer, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function updateCustomer(id, data) {
  try {
    const { name, phone, isGold } = data;
    const result = await Customer.findByIdAndUpdate(
      id,
      {
        $set: { name, phone, isGold: isGold || false },
      },
      { new: true, useFindAndModify: false }
    );
    return { data: result, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

async function deleteCustomer(id) {
  try {
    const customer = await Customer.findByIdAndRemove(id, {
      useFindAndModify: false,
    });
    return { data: customer, error: null };
  } catch (err) {
    return { data: null, error: err.message };
  }
}

module.exports = {
  getCustomers,
  createCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
};
