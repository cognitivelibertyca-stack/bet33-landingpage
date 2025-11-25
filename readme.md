/project-root
├── index.html              # Your MASTER file (UI, JS Logic, Styles)
├── netlify.toml            # Config for functions and build settings
└── netlify/
    └── functions/
        ├── get-stats.js    # Secure backend logic (Manus AI proxy)
        └── webhook.js      # Handle PayPal/Beehiiv events