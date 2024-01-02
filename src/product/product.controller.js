const Product = require('./product.model');

async function create(req, res) {
  const { data = {} } = req.body;

  if (data.name && data.cost) {
    try {
      // Create a new product document
      const newProduct = await Product.create({
        name: data.name,
        cost: data.cost
      });

      // Send a success response with the new product data
      res.status(201).json({ data: newProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(400).json({ error: 'Name and cost are required' });
  }
}

async function list(req, res) {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Format the response body
    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      cost: product.cost,
      __v: product.__v
    }));

    // Set the status code and send the formatted response
    res.status(200).json(formattedProducts);
  } catch (error) {
    // Handle errors and send an appropriate response
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  create,
  list
};



