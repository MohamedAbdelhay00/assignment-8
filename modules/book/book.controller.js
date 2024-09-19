import Book from "../../db/models/book.model.js";

const createBook = async (req, res) => {
  const { title, content, author, publishedDate } = req.body;

  try {
    const book = new Book({ title, content, author, publishedDate });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getAllBooks = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
  
    try {
      const books = await Book.find({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Book.countDocuments({
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      });
  
      res.status(200).json({
        books,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.status(200).json({ msg: "Book deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { createBook, getAllBooks, getBookById, updateBook, deleteBook };
