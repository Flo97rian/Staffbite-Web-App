require("babel-register")({
  presets: ["es2015", "react"]
})
  const router = require("./router").default;
  const Sitemap = require("react-router-sitemap").default;
  
  function generateSitemap() {
      return (
        new Sitemap(router)
            .build("https://www.staffbite.de/")
            .save("./public/sitemap.xml")
      );
  }
  
  generateSitemap();