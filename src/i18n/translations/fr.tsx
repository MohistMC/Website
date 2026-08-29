import { PartialLocaleState } from '@/features/i18n/TranslatorSlice'

const frTranslation: PartialLocaleState = {
    name: 'Français',
    locale: 'fr-FR',
    strings: {
        'index.head.title':
            'Découvrez la puissance du logiciel communautaire Minecraft.',
        'index.head.subtitle':
            "MohistMC se consacre à repousser les limites en accomplissant l'impossible grâce à la création d'un logiciel Minecraft hybride unique. De plus, nous nous efforçons de maintenir et d'améliorer certains mods et plugins, dans le but d'offrir aux joueurs une expérience de jeu exceptionnelle.",
        'index.cards.title': 'Passez votre serveur au niveau %supérieur%',
        'index.cards.mohist.description':
            'Un puissant logiciel de serveur hybride Mohist Forge implémentant les API Bukkit, Spigot.',
        'index.stats.title': 'Statistiques de MohistMC',
        'index.stats.resolvedbugs': 'Bugs résolus',
        'index.stats.openedissues': 'Nouveaux bugs trouvés',
        'index.stats.players': 'Joueurs',
        'index.stats.servers': 'Serveurs',
        'index.partner.title': 'Des %remerciements spéciaux% pour',
        'button.downloads': 'Téléchargements',
        'button.download': 'Télécharger',
        'button.discord': 'Discord',
        'button.github': 'GitHub',
        'button.sponsor': 'Faire un don',
        'button.api': 'API',
        'button.software': 'Logiciel',
        'button.learnmore': 'En savoir plus',
        'button.readmore': 'Lire plus',
        'button.documentation': 'Documentation',
        'button.documentations': 'Documentations',
        'button.about': 'À propos de nous',
        'button.team': 'Notre équipe',
        'button.community': 'Notre communauté',
        'button.download.mirror': 'Téléchargement alternatif',
        'button.sourcecode': 'Code source',
        'button.blog': 'Blog',
        'button.close': 'Fermer',
        'button.copy': 'Copier',
        'button.contribute': 'Contribuer',
        'footer.heading.gettingstarted': 'Pour commencer',
        'footer.heading.discover': 'Découvrez-nous',
        'footer.heading.community': 'Communauté',
        'social.github': 'GitHub',
        'social.discord': 'Discord',
        'social.forum': 'Forum',
        'social.opencollective': 'OpenCollective',
        'social.ghsponsors': 'GitHub Sponsors',
        'downloads.title':
            "Téléchargez n'importe lequel de nos logiciels %gratuitement !%",
        'downloads.mohist.desc':
            'Un logiciel de serveur Minecraft Forge implémentant les API Bukkit, Spigot. Avec ce logiciel, vous pouvez créer un serveur Minecraft avec des mods et des plugins ensemble !',
        'downloads.endtext': "C'est tout %pour le moment%",
        'downloadSoftware.title': 'Télécharger% %',
        'downloadSoftware.mohist.desc':
            'Téléchargez Mohist, notre logiciel de serveur Minecraft Forge implémentant les API Bukkit, Spigot.',
        'downloadSoftware.search.placeholder': 'Rechercher un build...',
        'downloadSoftware.search.caseSensitive': 'Respecter la casse',
        'downloadSoftware.search.wholeWord': 'Mot entier',
        'downloadSoftware.search.regex': 'Expression régulière',
        'downloadSoftware.search.regex.invalid':
            'Expression régulière invalide.',
        'downloadSoftware.search.noresults': 'Aucun résultat trouvé.',
        'downloadSoftware.search.nobuilds': 'Aucun build trouvé.',
        'downloadSoftware.build.sha256': 'Hash SHA256',
        'downloadSoftware.build.date': 'Date du build',
        'downloadSoftware.seemore': 'Voir plus',
        'downloadSoftware.version.label': 'Version de Minecraft',
        'downloadSoftware.latest.badge': 'Dernier build',
        'downloadSoftware.builtAgo': 'compilé {}',
        'downloadSoftware.byAuthor': 'par {}',
        'downloadSoftware.history': 'Historique des builds',
        'downloadSoftware.mohist.eol.title': "Mohist n'est plus maintenu.",
        'downloadSoftware.mohist.eol.body':
            'La propriété et les droits ont été cédés en janvier 2025, et les mises à jour sont suspendues. Les téléchargements restent disponibles ici, mais le cœur ne reçoit plus de correctifs. Le dépôt a été transféré vers',
        'downloadSoftware.day.today': "Aujourd'hui",
        'downloadSoftware.day.yesterday': 'Hier',
        'downloadSoftware.day.ago': 'Il y a {} jours',
        'downloadSoftware.iuse': "J'utilise ce build",
        'downloadSoftware.iuse.selected': 'Build sélectionné',
        'downloadSoftware.loader.bump': 'Ce build change de version de loader',
        'downloadSoftware.compare.behind.one': '1 build de retard',
        'downloadSoftware.compare.behind': '{} builds de retard',
        'downloadSoftware.compare.since': 'Ce qui a changé depuis {} :',
        'downloadSoftware.compare.uptodate': 'Vous êtes à jour',
        'downloadSoftware.compare.uptodate.desc':
            'Le build {} est le dernier disponible pour cette version.',
        'downloadSoftware.compare.loaderChanged':
            'Le loader embarqué passe de {} à {}.',
        'downloadSoftware.compare.update': 'Télécharger le dernier build',
        'downloadSoftware.build.id': 'Identifiant du build',
        'downloadSoftware.build.loader': 'Loader',
        'downloadSoftware.build.commit': 'Commit',
        'downloadSoftware.build.viewOnGithub': 'Voir sur GitHub',
        'downloadSoftware.page.title': 'Télécharger {} - MohistMC',
        'downloadSoftware.youer.desc':
            'Téléchargez Youer, notre logiciel de serveur Minecraft hybride NeoForge + Bukkit/Spigot.',
        'downloadSoftware.mohist.1.7.10.toast':
            "Mohist 1.7.10 a été interrompu, son utilisation n'est pas recommandée. Nous NE fournissons PAS de support pour Mohist 1.7.10. Vous pouvez utiliser CrucibleMC comme alternative.",
        'downloadSoftware.mohist.1.18.2.toast':
            'Mohist 1.18.2 est actuellement en phase de développement, il peut contenir des bugs.',
        'downloadSoftware.mohist.1.19.2.toast':
            'Mohist 1.19.2 est en développement lent et pourrait être bientôt abandonné. Il peut contenir des bugs.',
        'downloadSoftware.mohist.1.19.4.toast':
            "Mohist 1.19.4 a été interrompu, son utilisation n'est pas recommandée.",
        'downloadSoftware.mohist.1.20.toast':
            'Mohist 1.20 est abandonné, veuillez utiliser Mohist 1.20.1 pour recevoir les mises à jour.',
        'sponsor.title':
            "Soutenez le %futur% de l'innovation Minecraft avec MohistMC",
        'sponsor.subtitle':
            "Aidez à alimenter la croissance de la communauté de MohistMC. Votre soutien couvre les dépenses essentielles, y compris les services, les serveurs et l'infrastructure. Contribuez dès aujourd'hui et faites la différence dans l'avenir de MohistMC.",
        'sponsor.section.title': 'Nos %donateurs%',
        'sponsor.section.subtitle':
            'Ils nous font confiance dans nos projets !',
        'mohistapi.title': '% %%JSON API% de MohistMC',
        'mohistapi.subtitle':
            "L'API JSON de MohistMC permet aux développeurs d'obtenir des informations sur nos projets et les builds.",
        'team.title': 'Rencontrez notre %équipe !%',
        'software.mohist.subtitle':
            "Mohist est un logiciel serveur exceptionnel pour Minecraft Forge qui implémente les API Bukkit, Spigot. En exploitant cette puissante combinaison, vous pouvez créer un serveur Minecraft performant avec la capacité d'intégrer des mods et des plugins, garantissant ainsi stabilité et performances optimales.",
        'software.mohist.cards.title':
            "Qu'est ce qui rend %Mohist% si spécial ?",
        'software.mohist.cards.1.title': 'Performance Améliorée',
        'software.mohist.cards.1.desc':
            "Avec l'intégration de Bukkit & Spigot pour la prise en charge des plugins et de performances, profitez d'une expérience de jeu fluide et sans problème, même avec une multitude de mods et de plugins.",
        'software.mohist.cards.2.title': 'Compatibilité',
        'software.mohist.cards.2.desc':
            "Déverrouillez des possibilités infinies grâce à la compatibilité étendue des mods et des plugins avec Mohist. Personnalisez votre serveur facilement en utilisant l'intégration de Mohist avec les API Bukkit, Spigot.",
        'software.mohist.cards.3.title':
            'Support de la communauté et mises à jour régulières',
        'software.mohist.cards.3.desc':
            'Rejoignez la communauté Mohist pour obtenir du support et des mises à jour régulières ! Restez à jour avec les dernières versions de Minecraft et accédez aux nouvelles fonctionnalités et améliorations.',
        'software.mohist.footer.title':
            'Prêt à améliorer votre expérience de serveur Minecraft ?',
        'software.mohist.footer.desc':
            "Expérimentez une stabilité inégalée grâce à l'intégration des mods et des plugins, ainsi qu'à des performances optimisées. Rejoignez la communauté Mohist et déverrouillez des possibilités illimitées pour votre serveur. Passez à Mohist dès aujourd'hui et révolutionnez votre expérience Minecraft.",
        'software.mohist.footer.discord': 'Rejoignez notre serveur Discord',
        '404.title': 'non trouvé',
        '404.subtitle':
            "Nous sommes désolés, mais la ressource que vous essayez d'atteindre n'existe pas ou à été déplacée.",
        'docs.title': 'Documentations de MohistMC',
        'docs.subtitle':
            'MohistMC fournit diverses documentations pour nos logiciels. Cliquez simplement sur le logiciel que vous recherchez !',
        'docs.cards.websiteapi.title': 'API JSON de MohistMC',
        'docs.cards.websiteapi.desc':
            "L'API JSON de MohistMC permet aux développeurs d'obtenir des informations sur nos projets et les builds.",
        'toast.filters.enabled':
            'Vous avez toujours des filtres activés, si vous ne voyez rien, vous devrez peut-être les supprimer.',
        'loginmodal.title': 'Connexion pour signaler un problème',
        'loginmodal.subtitle':
            "Pour être sûr(e) que vous n'êtes pas un robot et pour pouvoir vous contacter, veuillez vous connecter pour signaler un problème.",
        'loginmodal.githublogin': 'Se connecter avec Github',
        'issuemodal.title':
            "Souhaitez-vous signaler un problème concernant l'un de nos logiciels ?",
        'issuemodal.subtitle':
            'Nous sommes toujours ravis de vous aider avec tout problème que vous pourriez rencontrer. Il existe deux façons de signaler un problème :',
        'issuemodal.report.github': 'Signaler via GitHub',
        'issuemodal.report.website': 'Signaler via le site web',
        'issuemodal.dropdown.item.website': 'Site web',
        'issuemodal.discord.text':
            "Vous avez également la possibilité de discuter avec nous sur Discord pour obtenir de l'aide ! Cependant, veuillez noter que dans la plupart des cas, il sera nécessaire d'ouvrir un ticket, étant donné la forte demande que nous recevons. Ainsi, Discord ne constitue pas toujours le moyen le plus optimal pour résoudre vos bugs.",
        'contribute.page.title': 'MohistMC - Contribuer',
        'contribute.title':
            'Contribuez à %MohistMC%, aidez-nous à créer de meilleurs logiciels !',
        'contribute.subtitle':
            'MohistMC développe des projets open source, alimentés par les contributions de la communauté. Il existe différentes façons pour vous de participer à ces projets.',
        'contribute.cards.finance.title': 'Contribuer financièrement',
        'contribute.cards.finance.desc':
            'MohistMC est une organisation à but non lucratif. Nous dépendons des dons pour financer nos opérations, développer nos projets et maintenir notre infrastructure. Votre contribution nous aidera à continuer à fournir nos services à la communauté.',
        'contribute.cards.github.title': 'Contribuer au code',
        'contribute.cards.github.desc':
            'MohistMC réalise des projets open source ! Les contributeurs sont les bienvenus. Vous pouvez contribuer à nos projets en soumettant des pull requests ou en ouvrant des issues sur GitHub.',
        'contribute.cards.docs.title': 'Contribuer à la documentation',
        'contribute.cards.docs.desc':
            'MohistMC propose diverses documentations pour nos logiciels, et de nombreux utilisateurs en ont besoin. Vous pouvez nous aider à améliorer la documentation en y contribuant sur GitHub.',
        'contribute.cards.translation.title': 'Devenir traducteur',
        'contribute.cards.translation.desc':
            "Nous mettons nos projets à disposition dans plusieurs langues afin que chacun puisse les utiliser. Si vous parlez couramment une langue autre que l'anglais, vous pouvez nous aider à traduire nos projets !",
        'contribute.cards.translation.button': 'Page Crowdin',
        'contribute.footer.title':
            'Rejoignez notre communauté et aidez-nous à créer de meilleurs projets !',
        'contribute.footer.desc':
            'MohistMC est une organisation animée par la communauté. Les contributions de la communautés nous aident à évoluer. Rejoignez notre communauté et aidez-nous à créer de meilleurs projets !',
        'second.ago': 'il y a 1 seconde',
        'seconds.ago': 'il y a {} secondes',
        'minute.ago': 'il y a 1 minute',
        'minutes.ago': 'il y a {} minutes',
        'hour.ago': 'il y a 1 heure',
        'hours.ago': 'il y a {} heures',
        'day.ago': 'il y a 1 jour',
        'days.ago': 'il y a {} jours',
        'week.ago': 'il y a 1 semaine',
        'weeks.ago': 'il y a {} semaines',
        'month.ago': 'il y a 1 mois',
        'months.ago': 'il y a {} mois',
        'year.ago': 'il y a 1 an',
        'years.ago': 'il y a {} ans',
        'just.now': "à l'instant",
        'toast.docsNotAvailableInSelectedLocale':
            "La documentation n'est pas disponible dans la langue sélectionnée. Vous serez redirigés vers la documentation en anglais.",
        'toast.sha256.copied':
            'Le hash SHA256 a été copié dans le presse-papiers.',
        'toast.commit.copied':
            'Le hash du commit a été copié dans le presse-papiers.',
        'toast.command.copied':
            'La commande a été copiée dans le presse-papiers.',
    },
}

export default frTranslation
