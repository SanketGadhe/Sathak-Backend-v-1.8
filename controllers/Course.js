const Course=require('../models/CoursesModel')
const createCourse = async (req, res) => {
    const { courseName, courseDescription, courseCategory, courseVideos } = req.body;
  
    const videos = JSON.parse(courseVideos);
    const videoUrls = req.files.videos.map((file, index) => ({
      title: videos[index].title,
      url: `/coursevideo/${file.filename}`,
      duration: videos[index].duration,
    }));
  
    const thumbnailUrl = req.files.thumbnail ? `/coursevideo/${req.files.thumbnail[0].filename}` : null;
  
    try {
      const newCourse = await Course.create({
        courseName,
        courseDescription,
        courseCategory,
        courseVideos: videoUrls,
        courseThumbnail: thumbnailUrl, // Save the thumbnail URL
      });
      res.status(201).json({ message: "Course added successfully!" });
    } catch (error) {
      console.log("Error", error);
      res.status(500).json({ error: error.message });
    }
  };

    const getCourse= async (req, res) => {
     try{
        const courses = await Course.find();
        res.status(200).json( courses );   
    }catch(error){
        res.status(500).json({ error: error.message });
    }}
    const getoneCourse= async (req, res) => {
        try{
        
        const course = await Course.find({courseName:req.params.courseName});
        res.status(200).json( course );   
    }catch(error){
        res.status(500).json({ error: `hws ${error.message}` });
    }}
module.exports={createCourse,getCourse,getoneCourse};