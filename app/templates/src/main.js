/* <%= libName %> main */

// Base function.
var <%= libNameNoJs %> = function() {
  // Add functionality here.
  return true;
};


// Version.
<%= libNameNoJs %>.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.<%= libNameNoJs %> = <%= libNameNoJs %>;
