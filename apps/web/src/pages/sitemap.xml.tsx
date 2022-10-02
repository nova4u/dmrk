import { GetServerSideProps } from "next"

const createSitemap = () => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
                <url>
                    <loc>${`https://dmrk.dev/`}</loc>
                </url>
    </urlset>
`

export default function SitemapXML() {
  return null
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/xml")
  res.setHeader("Cache-Control", "public, s-maxage=1200, stale-while-revalidate=600")
  res.write(createSitemap())
  res.end()
  return {
    props: {},
  }
}
