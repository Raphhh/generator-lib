/* <%= libName %> main */

// Base object.
var <%= libNameNoJs %> = function() {
  if (!(this instanceof <%= libNameNoJs %>)) {
    return new <%= libNameNoJs %>();
  }
};


// Version.
<%= libNameNoJs %>.VERSION = '0.0.0';


// Export to the root, which is probably `window`.
root.<%= libNameNoJs %> = <%= libNameNoJs %>;
