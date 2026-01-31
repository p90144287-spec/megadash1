window.APP_DATA = [
    // 🤖 AI
    { name: "ChatGPT", cat: "AI", url: "https://chatgpt.com", keywords: ["ai", "chatbot", "gpt", "assistant"] },
    { name: "Claude", cat: "AI", url: "https://claude.ai", keywords: ["ai", "chatbot", "anthropic"] },
    { name: "Perplexity", cat: "AI", url: "https://perplexity.ai", keywords: ["ai", "chatbot", "search", "assistant"] },
    { name: "Gemini", cat: "AI", url: "https://gemini.google.com", keywords: ["ai", "google", "assistant"] },
    { name: "Mid journey", cat: "AI", url: "https://midjourney.com", keywords: ["ai", "art", "image", "generator"] },
    { name: "Jasper", cat: "AI", url: "https://jasper.ai", keywords: ["ai", "writing", "content", "assistant"] },
    { name: "DeepL", cat: "AI", url: "https://deepl.com", keywords: ["translation", "ai", "translator", "languages"] },
    { name: "Grammarly", cat: "AI", url: "https://grammarly.com", keywords: ["writing", "grammar", "spelling", "ai"] },
    { name: "Hugging Face", cat: "AI", url: "https://huggingface.co", keywords: ["ai", "ml", "nlp", "models"] },
    { name: "Leonardo AI", cat: "AI", url: "https://leonardo.ai", keywords: ["ai", "art", "images", "creative"] },

    // 💻 Development
    { name: "Git Hub", cat: "Dev", url: "https://github.com", keywords: ["code", "repository", "git", "developer"] },
    { name: "Stack Overflow", cat: "Dev", url: "https://stackoverflow.com", keywords: ["code", "questions", "developer"] },
    { name: "Vercel", cat: "Dev", url: "https://vercel.com", keywords: ["deploy", "frontend", "host"] },
    { name: "Netlify", cat: "Dev", url: "https://netlify.com", keywords: ["deploy", "hosting", "web"] },
    { name: "Firebase", cat: "Dev", url: "https://firebase.google.com", keywords: ["database", "realtime", "auth", "backend"] },
    { name: "Supabase", cat: "Dev", url: "https://supabase.com", keywords: ["database", "postgres", "backend", "api"] },
    { name: "Replit", cat: "Dev", url: "https://replit.com", keywords: ["code", "online", "compiler", "editor"] },
    { name: "Postman", cat: "Dev", url: "https://postman.com", keywords: ["api", "request", "developer", "testing"] },
    { name: "CodePen", cat: "Dev", url: "https://codepen.io", keywords: ["frontend", "html", "css", "js", "sandbox"] },
    { name: "MDN Docs", cat: "Dev", url: "https://developer.mozilla.org", keywords: ["documentation", "javascript", "html", "css"] },

    // 💼 Productivity / Work
    { name: "Notion", cat: "Work", url: "https://notion.so", keywords: ["notes", "productivity", "workspace", "docs"] },
    { name: "Slack", cat: "Work", url: "https://slack.com", keywords: ["chat", "team", "messaging", "work"] },
    { name: "Trello", cat: "Work", url: "https://trello.com", keywords: ["project", "kanban", "board", "tasks"] },
    { name: "Asana", cat: "Work", url: "https://asana.com", keywords: ["project", "tasks", "workflow", "work"] },
    { name: "ClickUp", cat: "Work", url: "https://clickup.com", keywords: ["tasks", "project", "organization"] },
    { name: "Monday", cat: "Work", url: "https://monday.com", keywords: ["project", "tasks", "management"] },
    { name: "Zoom", cat: "Work", url: "https://zoom.us", keywords: ["video", "call", "meeting", "conference"] },
    { name: "Evernote", cat: "Work", url: "https://evernote.com", keywords: ["notes", "productivity", "organizer"] },
    { name: "Todoist", cat: "Work", url: "https://todoist.com", keywords: ["tasks", "todo", "productivity"] },
    { name: "Calendly", cat: "Work", url: "https://calendly.com", keywords: ["schedule", "meeting", "calendar"] },

    // 🎨 Design
    { name: "Figma", cat: "Design", url: "https://figma.com", keywords: ["ui", "ux", "design", "prototype"] },
    { name: "Canva", cat: "Design", url: "https://canva.com", keywords: ["design", "graphics", "poster", "creative"] },
    { name: "Dribbble", cat: "Design", url: "https://dribbble.com", keywords: ["portfolio", "designer", "creative"] },
    { name: "Behance", cat: "Design", url: "https://behance.net", keywords: ["portfolio", "designer", "creative"] },
    { name: "Framer", cat: "Design", url: "https://framer.com", keywords: ["prototype", "ui", "ux", "interactive"] },
    { name: "Unsplash", cat: "Design", url: "https://unsplash.com", keywords: ["images", "photos", "free", "stock"] },
    { name: "Pinterest", cat: "Design", url: "https://pinterest.com", keywords: ["images", "inspiration", "ideas"] },
    { name: "Coolors", cat: "Design", url: "https://coolors.co", keywords: ["colors", "palette", "design"] },
    { name: "Adobe Express", cat: "Design", url: "https://adobe.com/express", keywords: ["design", "creative", "graphics"] },
    { name: "Icons8", cat: "Design", url: "https://icons8.com", keywords: ["icons", "graphics", "design"] },

    // 📱 Social
    { name: "YouTube", cat: "Social", url: "https://youtube.com", keywords: ["video", "entertainment", "movies", "clips"] },
    { name: "Instagram", cat: "Social", url: "https://instagram.com", keywords: ["photo", "social", "stories"] },
    { name: "X / Twitter", cat: "Social", url: "https://x.com", keywords: ["tweet", "social", "microblog"] },
    { name: "LinkedIn", cat: "Social", url: "https://linkedin.com", keywords: ["work", "professional", "career"] },
    { name: "Reddit", cat: "Social", url: "https://reddit.com", keywords: ["forum", "discussion", "community"] },
    { name: "Discord", cat: "Social", url: "https://discord.com", keywords: ["chat", "community", "gaming"] },
    { name: "TikTok", cat: "Social", url: "https://tiktok.com", keywords: ["shorts", "video", "entertainment"] },
    { name: "Telegram", cat: "Social", url: "https://web.telegram.org", keywords: ["chat", "messenger", "social"] },
    { name: "WhatsApp", cat: "Social", url: "https://web.whatsapp.com", keywords: ["chat", "messenger", "social"] },
    { name: "Snapchat", cat: "Social", url: "https://web.snapchat.com", keywords: ["chat", "stories", "social"] },

    // 🎬 Media
    { name: "Spotify", cat: "Media", url: "https://open.spotify.com", keywords: ["music", "songs", "audio", "streaming"] },
    { name: "Netflix", cat: "Media", url: "https://netflix.com", keywords: ["movies", "shows", "streaming", "entertainment"] },
    { name: "Disney+", cat: "Media", url: "https://disneyplus.com", keywords: ["movies", "shows", "disney", "streaming"] },
    { name: "Twitch", cat: "Media", url: "https://twitch.tv", keywords: ["stream", "gaming", "live", "video"] },
    { name: "Sound Cloud", cat: "Media", url: "https://soundcloud.com", keywords: ["music", "audio", "songs", "streaming"] },
    { name: "Crunchy roll", cat: "Media", url: "https://crunchyroll.com", keywords: ["anime", "japanese", "shows", "streaming"] },
    { name: "HBO Max", cat: "Media", url: "https://max.com", keywords: ["movies", "shows", "streaming", "hbo"] },
    { name: "Apple Music", cat: "Media", url: "https://music.apple.com", keywords: ["music", "songs", "streaming", "apple"] },
    { name: "Vimeo", cat: "Media", url: "https://vimeo.com", keywords: ["video", "streaming", "film"] },
    { name: "Audible", cat: "Media", url: "https://audible.com", keywords: ["audiobooks", "listen", "books"] },

    // 🎮 Games
    { name: "Poki", cat: "Games", url: "https://poki.com", keywords: ["games", "play", "fun"] },
    { name: "Steam", cat: "Games", url: "https://store.steampowered.com", keywords: ["games", "pc", "store"] },
    { name: "Epic Games", cat: "Games", url: "https://epicgames.com", keywords: ["games", "pc", "store"] },
    { name: "Roblox", cat: "Games", url: "https://roblox.com", keywords: ["games", "play", "online"] },
    { name: "Chess.com", cat: "Games", url: "https://chess.com", keywords: ["chess", "board", "game"] },
    { name: "Itch.io", cat: "Games", url: "https://itch.io", keywords: ["games", "indie", "play"] },
    { name: "IGN", cat: "Games", url: "https://ign.com", keywords: ["games", "news", "reviews"] },
    { name: "Games pot", cat: "Games", url: "https://gamespot.com", keywords: ["games", "news", "reviews"] },
    { name: "Armor Games", cat: "Games", url: "https://armorgames.com", keywords: ["games", "play", "fun"] },
    { name: "Crazy Games", cat: "Games", url: "https://crazygames.com", keywords: ["games", "fun", "online"] },

    // 💸 Finance
    { name: "PayPal", cat: "Finance", url: "https://paypal.com", keywords: ["payments", "money", "transfer"] },
    { name: "Stripe", cat: "Finance", url: "https://stripe.com", keywords: ["payments", "money", "online"] },
    { name: "Wise", cat: "Finance", url: "https://wise.com", keywords: ["money", "transfer", "currency"] },
    { name: "Binance", cat: "Finance", url: "https://binance.com", keywords: ["crypto", "bitcoin", "exchange"] },
    { name: "Coinbase", cat: "Finance", url: "https://coinbase.com", keywords: ["crypto", "bitcoin", "wallet"] },
    { name: "Trading View", cat: "Finance", url: "https://tradingview.com", keywords: ["stocks", "charts", "finance"] },
    { name: "Revolut", cat: "Finance", url: "https://revolut.com", keywords: ["banking", "finance", "money"] },
    { name: "Robin hood", cat: "Finance", url: "https://robinhood.com", keywords: ["stocks", "investing", "finance"] },
    { name: "Yahoo Finance", cat: "Finance", url: "https://finance.yahoo.com", keywords: ["stocks", "finance", "investing"] },
    { name: "Investing.com", cat: "Finance", url: "https://investing.com", keywords: ["stocks", "finance", "investing"] },

    // 🎓 Education
    { name: "Coursera", cat: "Edu", url: "https://coursera.org", keywords: ["courses", "learning", "education"] },
    { name: "Udemy", cat: "Edu", url: "https://udemy.com", keywords: ["courses", "learning", "education"] },
    { name: "Khan Academy", cat: "Edu", url: "https://khanacademy.org", keywords: ["courses", "learning", "school"] },
    { name: "Duolingo", cat: "Edu", url: "https://duolingo.com", keywords: ["language", "learning", "education"] },
    { name: "Codecademy", cat: "Edu", url: "https://codecademy.com", keywords: ["coding", "learning", "programming"] },
    { name: "Skillshare", cat: "Edu", url: "https://skillshare.com", keywords: ["courses", "learning", "creative"] },
    { name: "Medium", cat: "Edu", url: "https://medium.com", keywords: ["articles", "writing", "blog"] },
    { name: "Wikipedia", cat: "Edu", url: "https://wikipedia.org", keywords: ["articles", "knowledge", "encyclopedia"] },
    { name: "Wolfram Alpha", cat: "Edu", url: "https://wolframalpha.com", keywords: ["calculator", "math", "knowledge"] },
    { name: "edX", cat: "Edu", url: "https://edx.org", keywords: ["courses", "learning", "education"] },

    // 🛠️ Utilities
    { name: "Speedtest", cat: "Utils", url: "https://speedtest.net", keywords: ["internet", "speed", "test"] },
    { name: "Cloudflare", cat: "Utils", url: "https://cloudflare.com", keywords: ["dns", "cdn", "security"] },
    { name: "Bitly", cat: "Utils", url: "https://bitly.com", keywords: ["shorten", "link", "url"] },
    { name: "TinyPNG", cat: "Utils", url: "https://tinypng.com", keywords: ["compress", "image", "png", "jpg"] },
    { name: "1Password", cat: "Utils", url: "https://1password.com", keywords: ["password", "manager", "security"] },
    { name: "WeTransfer", cat: "Utils", url: "https://wetransfer.com", keywords: ["files", "transfer", "share"] },
    { name: "Remove.bg", cat: "Utils", url: "https://remove.bg", keywords: ["remove", "background", "image"] },
    { name: "Convertio", cat: "Utils", url: "https://convertio.co", keywords: ["convert", "file", "format"] },
    { name: "Archive.org", cat: "Utils", url: "https://archive.org", keywords: ["library", "history", "archive"] },
    { name: "VirusTotal", cat: "Utils", url: "https://virustotal.com", keywords: ["scan", "virus", "security"] },

    // 📰 News
    { name: "Google News", cat: "News", url: "https://news.google.com", keywords: ["news", "headlines"] },

    // 🛍️ Shopping
    { name: "Amazon", cat: "Shopping", url: "https://amazon.in", keywords: ["shopping", "buy", "store"] },
    { name: "Flipkart", cat: "Shopping", url: "https://flipkart.com", keywords: ["shopping", "ecommerce"] },

    // 🏥 Health
    { name: "WebMD", cat: "Health", url: "https://webmd.com", keywords: ["health", "medical"] },

    // ✈️ Travel
    { name: "Make My Trip", cat: "Travel", url: "https://makemytrip.com", keywords: ["travel", "flight", "hotel"] },
    { name: "Google Maps", cat: "Travel", url: "https://maps.google.com", keywords: ["maps", "navigation"] },

    // 🛡️ Security
    { name: "Have I Been Pwned", cat: "Security", url: "https://haveibeenpwned.com", keywords: ["security", "breach"] },

    // ☁️ Cloud
    { name: "AWS Console", cat: "Cloud", url: "https://aws.amazon.com/console", keywords: ["cloud", "aws"] },
    { name: "Google Cloud", cat: "Cloud", url: "https://cloud.google.com", keywords: ["cloud", "gcp"] },

    // 🌐 Browser
    { name: "Chrome Web Store", cat: "Browser", url: "https://chrome.google.com/webstore", keywords: ["browser", "extensions"] },

    // 🏛️ Government
    { name: "India Gov", cat: "Government", url: "https://india.gov.in", keywords: ["government", "india"] },

    // 🔬 Science
    { name: "NASA", cat: "Science", url: "https://www.nasa.gov", keywords: ["space", "science", "nasa"] },
    { name: "ESA (European Space Agency)", cat: "Science", url: "https://www.esa.int", keywords: ["space", "astronomy", "science"] },
    { name: "Space", cat: "Science", url: "https://www.space.com", keywords: ["space", "astronomy", "news"] },
    { name: "Hubble Site", cat: "Science", url: "https://hubblesite.org", keywords: ["space", "telescope", "nasa"] },
    { name: "Science Daily", cat: "Science", url: "https://www.sciencedaily.com", keywords: ["science", "research", "news"] },
    { name: "Scientific American", cat: "Science", url: "https://www.scientificamerican.com", keywords: ["science", "research", "articles"] },
    { name: "CERN", cat: "Science", url: "https://home.cern", keywords: ["physics", "particles", "science"] },
    { name: "NOAA", cat: "Science", url: "https://www.noaa.gov", keywords: ["climate", "earth", "weather"] },
    { name: "BrainFacts", cat: "Science", url: "https://www.brainfacts.org", keywords: ["neuroscience", "brain"] },
    { name: "arXiv", cat: "Science", url: "https://arxiv.org", keywords: ["physics", "math", "ai", "research"] },
    { name: "Google Scholar", cat: "Science", url: "https://scholar.google.com", keywords: ["research", "papers", "science"] },
    { name: "Semantic Scholar", cat: "Science", url: "https://www.semanticscholar.org", keywords: ["research", "ai", "science"] },
                // 🔬 SCIENCE
            { name: "NASA", cat: "Science", url: "https://www.nasa.gov", keywords: ["space", "science", "nasa", "planets"] },
            { name: "ESA", cat: "Science", url: "https://www.esa.int", keywords: ["space", "astronomy", "science", "europe"] },
            { name: "Space.com", cat: "Science", url: "https://www.space.com", keywords: ["space", "astronomy", "news", "galaxy"] },
            { name: "Hubble Site", cat: "Science", url: "https://hubblesite.org", keywords: ["space", "telescope", "nasa", "universe"] },
            { name: "Science Daily", cat: "Science", url: "https://www.sciencedaily.com", keywords: ["science", "research", "news", "discovery"] },
            { name: "Scientific American", cat: "Science", url: "https://www.scientificamerican.com", keywords: ["science", "research", "articles", "nature"] },
            { name: "CERN", cat: "Science", url: "https://home.cern", keywords: ["physics", "particles", "science", "lab"] },
            { name: "NOAA", cat: "Science", url: "https://www.noaa.gov", keywords: ["climate", "earth", "weather", "ocean"] },
            { name: "BrainFacts", cat: "Science", url: "https://www.brainfacts.org", keywords: ["neuroscience", "brain", "biology"] },
            { name: "arXiv", cat: "Science", url: "https://arxiv.org", keywords: ["physics", "math", "ai", "research", "papers"] },
            { name: "Google Scholar", cat: "Science", url: "https://scholar.google.com", keywords: ["research", "papers", "science", "academic"] },
            { name: "Semantic Scholar", cat: "Science", url: "https://www.semanticscholar.org", keywords: ["research", "ai", "science", "discovery"] },

            // 📰 News
            { name: "Google News", cat: "News", url: "https://news.google.com", keywords: ["news", "headlines", "world", "local"] },
            { name: "BBC News", cat: "News", url: "https://www.bbc.com/news", keywords: ["news", "world", "uk", "headlines"] },
            { name: "Reuters", cat: "News", url: "https://www.reuters.com", keywords: ["news", "finance", "world", "reports"] },

            // 🛍️ Shopping
            { name: "Amazon", cat: "Shopping", url: "https://amazon.in", keywords: ["shopping", "buy", "store", "ecommerce"] },
            { name: "Flipkart", cat: "Shopping", url: "https://flipkart.com", keywords: ["shopping", "ecommerce", "deals", "buy"] },
            { name: "eBay", cat: "Shopping", url: "https://ebay.com", keywords: ["shopping", "auction", "buy", "sell"] },

            // 🏥 Health
            { name: "WebMD", cat: "Health", url: "https://webmd.com", keywords: ["health", "medical", "symptoms", "doctors"] },
            { name: "Mayo Clinic", cat: "Health", url: "https://www.mayoclinic.org", keywords: ["health", "medical", "advice", "care"] },
            { name: "Healthline", cat: "Health", url: "https://www.healthline.com", keywords: ["health", "wellness", "nutrition", "fitness"] },

            // ✈️ Travel
            { name: "Make My Trip", cat: "Travel", url: "https://makemytrip.com", keywords: ["travel", "flight", "hotel", "booking"] },
            { name: "Google Maps", cat: "Travel", url: "https://maps.google.com", keywords: ["maps", "navigation", "gps", "route"] },
            { name: "Booking.com", cat: "Travel", url: "https://booking.com", keywords: ["hotel", "travel", "stay", "accommodation"] },

            // 🛡️ Security
            { name: "Have I Been Pwned", cat: "Security", url: "https://haveibeenpwned.com", keywords: ["security", "breach", "password", "hack"] },
            { name: "ProtonMail", cat: "Security", url: "https://mail.proton.me", keywords: ["email", "privacy", "secure", "encrypted"] },

            // ☁️ Cloud
            { name: "AWS Console", cat: "Cloud", url: "https://aws.amazon.com/console", keywords: ["cloud", "aws", "server", "amazon"] },
            { name: "Google Cloud", cat: "Cloud", url: "https://cloud.google.com", keywords: ["cloud", "gcp", "server", "google"] },
            { name: "DigitalOcean", cat: "Cloud", url: "https://digitalocean.com", keywords: ["cloud", "hosting", "droplet", "vps"] },

            // 🌐 Browser
            { name: "Chrome Web Store", cat: "Browser", url: "https://chrome.google.com/webstore", keywords: ["browser", "extensions", "themes", "plugins"] },

            // 🏛️ Government
            { name: "India Gov", cat: "Government", url: "https://india.gov.in", keywords: ["government", "india", "portal", "services"] },
            { name: "USA.gov", cat: "Government", url: "https://usa.gov", keywords: ["government", "usa", "portal", "services"] },
                        // 🎨 DESIGN & CREATIVE (Additions)
            { name: "Pexels", cat: "Design", url: "https://pexels.com", keywords: ["photos", "videos", "stock", "free", "creative"] },
            { name: "Pixabay", cat: "Design", url: "https://pixabay.com", keywords: ["images", "illustrations", "vectors", "free"] },
            { name: "LottieFiles", cat: "Design", url: "https://lottiefiles.com", keywords: ["animation", "json", "motion", "ui"] },
            { name: "Font Awesome", cat: "Design", url: "https://fontawesome.com", keywords: ["icons", "fonts", "svg", "web"] },
            { name: "Google Fonts", cat: "Design", url: "https://fonts.google.com", keywords: ["typography", "fonts", "webdesign"] },
            { name: "Adobe Color", cat: "Design", url: "https://color.adobe.com", keywords: ["palette", "color", "wheel", "scheme"] },

            // 💻 DEVELOPMENT (Additions)
            { name: "Docker Hub", cat: "Dev", url: "https://hub.docker.com", keywords: ["containers", "devops", "images", "deployment"] },
            { name: "npm", cat: "Dev", url: "https://npmjs.com", keywords: ["javascript", "packages", "node", "modules"] },
            { name: "Can I Use", cat: "Dev", url: "https://caniuse.com", keywords: ["browser", "support", "html5", "css3"] },
            { name: "JSON Formatter", cat: "Dev", url: "https://jsonlint.com", keywords: ["json", "validate", "format", "debug"] },
            { name: "Regex101", cat: "Dev", url: "https://regex101.com", keywords: ["regex", "test", "debug", "expression"] },
            { name: "W3Schools", cat: "Dev", url: "https://w3schools.com", keywords: ["tutorial", "learn", "html", "css", "js"] },

            // 🤖 AI (Additions)
            { name: "Phind", cat: "AI", url: "https://phind.com", keywords: ["ai", "search", "developer", "coding", "answer"] },
            { name: "RunwayML", cat: "AI", url: "https://runwayml.com", keywords: ["video", "ai", "editing", "generation"] },
            { name: "Stable Diffusion", cat: "AI", url: "https://stablediffusionweb.com", keywords: ["art", "image", "generator", "ai"] },
            { name: "ElevenLabs", cat: "AI", url: "https://elevenlabs.io", keywords: ["voice", "ai", "speech", "tts"] },

            // 💼 WORK & PRODUCTIVITY (Additions)
            { name: "Loom", cat: "Work", url: "https://loom.com", keywords: ["video", "screen", "recorder", "sharing"] },
            { name: "Miro", cat: "Work", url: "https://miro.com", keywords: ["whiteboard", "collaboration", "planning", "diagram"] },
            { name: "Buffer", cat: "Work", url: "https://buffer.com", keywords: ["social", "marketing", "scheduling", "post"] },
            { name: "Mailchimp", cat: "Work", url: "https://mailchimp.com", keywords: ["email", "marketing", "newsletter", "campaign"] },
            { name: "Pocket", cat: "Work", url: "https://getpocket.com", keywords: ["save", "read", "articles", "later"] },

            // 💸 FINANCE (Additions)
            { name: "Investopedia", cat: "Finance", url: "https://investopedia.com", keywords: ["learn", "finance", "stocks", "dictionary"] },
            { name: "MarketWatch", cat: "Finance", url: "https://marketwatch.com", keywords: ["news", "stocks", "market", "economy"] },
            { name: "OpenSea", cat: "Finance", url: "https://opensea.io", keywords: ["nft", "crypto", "art", "blockchain"] },
            { name: "Etherscan", cat: "Finance", url: "https://etherscan.io", keywords: ["ethereum", "blockchain", "explorer", "crypto"] },

            // 🎮 GAMES & MEDIA (Additions)
            { name: "2048", cat: "Games", url: "https://play2048.co", keywords: ["puzzle", "numbers", "game", "fun"] },
            { name: "Agar.io", cat: "Games", url: "https://agar.io", keywords: ["multiplayer", "io", "game", "online"] },
            { name: "Letterboxd", cat: "Media", url: "https://letterboxd.com", keywords: ["movies", "reviews", "ratings", "films"] },
            { name: "IMDb", cat: "Media", url: "https://imdb.com", keywords: ["movies", "database", "actors", "series"] },
            { name: "Mixcloud", cat: "Media", url: "https://mixcloud.com", keywords: ["radio", "dj", "mix", "audio", "music"] },

            // 🎓 EDUCATION (Additions)
            { name: "Ted Ed", cat: "Edu", url: "https://ed.ted.com", keywords: ["lessons", "videos", "learning", "education"] },
            { name: "Brilliant", cat: "Edu", url: "https://brilliant.org", keywords: ["math", "science", "logic", "interactive"] },
            { name: "Wolfram Physics", cat: "Edu", url: "https://wolframphysics.org", keywords: ["physics", "science", "theory", "research"] },
            { name: "Goodreads", cat: "Edu", url: "https://goodreads.com", keywords: ["books", "reading", "reviews", "library"] },

            // 🛠️ UTILITIES (Additions)
            { name: "CloudConvert", cat: "Utils", url: "https://cloudconvert.com", keywords: ["convert", "file", "video", "audio", "pdf"] },
            { name: "Wolfram Cloud", cat: "Utils", url: "https://wolframcloud.com", keywords: ["computation", "math", "data", "programming"] },
            { name: "Temp Mail", cat: "Utils", url: "https://temp-mail.org", keywords: ["disposable", "email", "temporary", "spam"] },
            { name: "Wayback Machine", cat: "Utils", url: "https://archive.org/web/", keywords: ["history", "internet", "archive", "old"] },
            { name: "DuckDuckGo", cat: "Utils", url: "https://duckduckgo.com", keywords: ["search", "privacy", "engine"] },

            // 📰 NEWS & BLOGS
            { name: "The Verge", cat: "News", url: "https://theverge.com", keywords: ["tech", "gadgets", "science", "news"] },
            { name: "TechCrunch", cat: "News", url: "https://techcrunch.com", keywords: ["startup", "tech", "funding", "news"] },
            { name: "Hacker News", cat: "News", url: "https://news.ycombinator.com", keywords: ["tech", "coding", "startup", "articles"] },

            // 🛍️ SHOPPING & SERVICES
            { name: "AliExpress", cat: "Shopping", url: "https://aliexpress.com", keywords: ["buy", "ecommerce", "cheap", "global"] },
            { name: "Etsy", cat: "Shopping", url: "https://etsy.com", keywords: ["handmade", "vintage", "crafts", "shop"] },
            { name: "Fiverr", cat: "Work", url: "https://fiverr.com", keywords: ["freelance", "services", "gig", "design"] },
            { name: "Upwork", cat: "Work", url: "https://upwork.com", keywords: ["freelance", "jobs", "hire", "work"] },

            // 🏥 HEALTH & WELLNESS
            { name: "Calm", cat: "Health", url: "https://calm.com", keywords: ["meditation", "sleep", "relax", "wellness"] },
            { name: "Headspace", cat: "Health", url: "https://headspace.com", keywords: ["meditation", "mindfulness", "health"] },
            { name: "Strava", cat: "Health", url: "https://strava.com", keywords: ["running", "cycling", "fitness", "tracking"] },
            { name: "MyFitnessPal", cat: "Health", url: "https://myfitnesspal.com", keywords: ["diet", "calories", "fitness", "tracking"] },
];