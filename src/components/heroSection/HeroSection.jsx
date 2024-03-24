// Importing an image asset named 'ef.jpg' from the specified path
import abcImage from '../../assets/ef.jpg'; // Adjust the path based on your folder structure

// Define a functional component called HeroSection
function HeroSection() {
  // Rendering the HeroSection component
  return (
    <div>
      {/* Displaying an image using the imported 'abcImage' */}
      <img
        src={abcImage} // Using the imported image as the source
        alt="ABC" // Providing alternative text for accessibility purposes
        style={{ height: '350px', width: '100%' }} // Applying inline styles for height and width
      />
    </div>
  );
}

export default HeroSection; // Exporting the HeroSection component
