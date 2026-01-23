{almaredDuas.sections.map((section, idx) => (
  <section key={idx} className="space-y-6">
    <h2 className="text-2xl font-bold text-center">
      {section.title}
    </h2>

    <div className="grid md:grid-cols-2 gap-6">
      {section.duas.map((dua) => (
        <DuaCard key={dua.id} dua={dua} />
      ))}
    </div>
  </section>
))}
