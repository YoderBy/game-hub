
import useFetchObjects, { JsonVideos } from '../Hooks/useFetchObjects';
import { Course, DisplayQuery, Video } from '../utils/types';
import { SimpleGrid } from '@chakra-ui/react';
import VideoCard from './VideoCard';
import CourseCard from './CourseCard';
import { isVideo, timeToSeconds } from '../utils/helpersFunctions';
interface Props {
  DisplayQuery: DisplayQuery;
  onClick: (course: Course) => void;
}

const ObjectGrid: React.FC<Props> = ({ DisplayQuery, onClick }) => {
  let ObjectToRender = useFetchObjects(DisplayQuery)
  


  if(!isVideo(ObjectToRender)){
  if(DisplayQuery.sortBy == 'amount'){  
  ObjectToRender = ObjectToRender.sort((Object1 : Course, Object2 : Course) => Object2.ids.length - Object1.ids.length)
  }
  if(DisplayQuery.sortBy == 'date'){  
    ObjectToRender = ObjectToRender.sort((a, b) => {
      if (!a.date[0]) return 1;
      if (!b.date[0]) return -1; 
      const dateA = new Date(a.date[0] ?? '').getTime();
      const dateB = new Date(b.date[0] ?? '').getTime();
      return dateB - dateA; 
    });
}}

  else {
  
    if(DisplayQuery.sortBy == 'date'){
    ObjectToRender = ObjectToRender.sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1; 
      const dateA = new Date(a.date ?? '').getTime();
      const dateB = new Date(b.date ?? '').getTime();
      return dateB - dateA; 
    });
  }
  if(DisplayQuery.sortBy == 'duration'){
    ObjectToRender = ObjectToRender.sort((a, b) => {
      if (!a.duration) return 1;
      if (!b.duration) return -1; 
      const dateA = timeToSeconds(a.duration);
      const dateB = timeToSeconds(b.duration);
      return dateB - dateA; 
    });
  }
  }

  // get objects and renders them inside the grid
  // the things to renders depends on the app componenet

  return (
    <>
      <SimpleGrid
        dir="rtl"
        padding={'5px'}
        columns={{ sm: 1, md: 2, lg: 4, xl: 6 }}
        spacing={7}
      >
        {
         DisplayQuery.searchQuery === ""? 
          DisplayQuery.type == 'faculty' ? // there is probebly a better way to render it
            ObjectToRender.map(course =>
              <CourseCard key = {course.id} Course={course as Course} onClick={onClick} />
            ) :
            ObjectToRender.map(video =>
              <VideoCard key = {video.id} video={video as Video} />
            )
          :
          ObjectToRender.map(video =>
            <VideoCard key = {video.id} video={video as Video} />
          )
      }
      
      </SimpleGrid>
    </>
  );
};

export default ObjectGrid;
