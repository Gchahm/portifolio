import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

interface GitHubReadmeProps {
  githubUrl: string
}

interface ReadmeData {
  content: string | null
  error: string | null
}

async function fetchGitHubReadme(githubUrl: string): Promise<ReadmeData> {
  try {
    // Parse GitHub URL to extract owner and repo
    const url = new URL(githubUrl)
    const pathParts = url.pathname.split('/').filter(Boolean)

    if (pathParts.length < 2) {
      return { content: null, error: 'Invalid GitHub URL format' }
    }

    const owner = pathParts[0]
    const repo = pathParts[1]

    // Fetch README from GitHub API
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/readme`
    const response = await fetch(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
      },
      // Add revalidate to cache for 1 hour
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return { content: null, error: 'README not found for this repository' }
      }
      return { content: null, error: `Failed to fetch README: ${response.statusText}` }
    }

    const content = await response.text()
    return { content, error: null }
  } catch (error) {
    return {
      content: null,
      error: error instanceof Error ? error.message : 'Failed to fetch README'
    }
  }
}

export async function GitHubReadme({ githubUrl }: GitHubReadmeProps) {
  if (!githubUrl) {
    return null
  }

  const { content, error } = await fetchGitHubReadme(githubUrl)

  if (error) {
    return (
      <div className="container py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <p className="text-red-800 dark:text-red-200">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (!content) {
    return null
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto">
        <article className="prose prose-slate dark:prose-invert max-w-none prose-pre:bg-slate-900 prose-pre:text-slate-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
          >
            {content}
          </ReactMarkdown>
        </article>
      </div>
    </div>
  )
}
