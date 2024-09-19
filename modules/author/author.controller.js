import Author from "../../db/models/author.model.js";
import Book from "../../db/models/book.model.js";

const createAuthor = async (req, res) => {
  const { name, bio, birthDate } = req.body;

  try {
    const author = new Author({ name, bio, birthDate });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

 const getAllAuthors = async (req, res) => {
    const { page = 1, limit = 10, search = '' } = req.query;
  
    try {
      const authors = await Author.find({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { bio: { $regex: search, $options: 'i' } },
        ],
      })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Author.countDocuments({
        $or: [
          { name: { $regex: search, $options: 'i' } },
          { bio: { $regex: search, $options: 'i' } },
        ],
      });
  
      res.status(200).json({
        authors,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  

const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).populate("books");
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateAuthor = async (req, res) => {
  try {
    const updatedAuthor = await Author.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAuthor) {
      return res.status(404).json({ msg: "Author not found" });
    }
    res.status(200).json(updatedAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    const author = await Author.findByIdAndDelete(req.params.id);
    if (!author) {
      return res.status(404).json({ msg: "Author not found" });
    }
    res.status(200).json({ msg: "Author deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  createAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
